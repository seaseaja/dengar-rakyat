// Quick DB check script
const mysql = require('mysql2/promise');

async function checkDB() {
  try {
    // Connect to MySQL (without selecting database first)
    const dbPassword = process.env.DB_PASSWORD;
    const dbHost = process.env.DB_HOST;
    const dbUser = process.env.DB_USER;

    const connection = await mysql.createConnection({
      host: dbHost,
      user: dbUser,
      password: dbPassword
    });

    console.log('✅ MySQL connection: OK\n');

    // Check if database exists
    const [dbs] = await connection.query("SHOW DATABASES LIKE 'dengar_rakyat'");
    
    if (dbs.length === 0) {
      console.log('❌ Database "dengar_rakyat" TIDAK DITEMUKAN');
      console.log('\n📋 Jalankan migration:');
      console.log('   mysql -u root -p < db/mysql_migration.sql');
      await connection.end();
      return;
    }

    console.log('✅ Database "dengar_rakyat" EXISTS\n');

    // Connect to the database
    await connection.query('USE dengar_rakyat');

    // Check tables
    const [tables] = await connection.query('SHOW TABLES');
    console.log(`📊 Total tables: ${tables.length}`);
    
    if (tables.length === 0) {
      console.log('❌ Database kosong! Run migration dulu.');
      await connection.end();
      return;
    }

    console.log('\n📋 Tables:');
    tables.forEach(t => {
      const tableName = Object.values(t)[0];
      console.log(`   - ${tableName}`);
    });

    // Check if users exist
    const [users] = await connection.query('SELECT COUNT(*) as count FROM users');
    const userCount = users[0].count;
    console.log(`\n👥 Total users: ${userCount}`);

    if (userCount === 0) {
      console.log('❌ Tidak ada users! Run seed script:');
      console.log('   npx tsx scripts/seed-hardened-users.ts');
    } else {
      console.log('✅ Database has data');
      
      // Show sample users
      const [sampleUsers] = await connection.query('SELECT email, role FROM users LIMIT 5');
      console.log('\n📝 Sample users:');
      sampleUsers.forEach(u => {
        console.log(`   - ${u.email} (${u.role})`);
      });
    }

    // Check if encryption columns exist
    const [columns] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'dengar_rakyat' 
        AND TABLE_NAME = 'users' 
        AND COLUMN_NAME IN ('nik_enc', 'alamat_enc', 'nik_hash')
    `);

    console.log(`\n🔒 Encryption columns: ${columns.length}/3`);
    if (columns.length < 3) {
      console.log('❌ Encryption columns belum ada! Run H1 migration:');
      console.log('   mysql -u root -p dengar_rakyat < db/iter2_h1_schema_migration.sql');
    } else {
      console.log('✅ Encryption columns ready');
    }

    // Check if session timeout column exists
    const [sessionCols] = await connection.query(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = 'dengar_rakyat' 
        AND TABLE_NAME = 'sessions' 
        AND COLUMN_NAME = 'last_activity_at'
    `);

    console.log(`\n⏰ Session timeout: ${sessionCols.length === 1 ? '✅ Ready' : '❌ Missing'}`);
    if (sessionCols.length === 0) {
      console.log('   Run: mysql -u root -p dengar_rakyat < db/iter2_h3_session_timeout.sql');
    }

    // Check if audit_logs table exists
    const [auditTable] = await connection.query(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = 'dengar_rakyat' 
        AND TABLE_NAME = 'audit_logs'
    `);

    console.log(`\n📋 Audit logging: ${auditTable.length === 1 ? '✅ Ready' : '❌ Missing'}`);
    if (auditTable.length === 0) {
      console.log('   Run: mysql -u root -p dengar_rakyat < db/iter3_p1_audit_schema.sql');
    }

    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY:');
    console.log('='.repeat(60));
    
    if (userCount > 0 && columns.length === 3 && sessionCols.length === 1 && auditTable.length === 1) {
      console.log('✅ Database FULLY CONFIGURED and READY!');
      console.log('\n🚀 You can run: npm run dev');
    } else {
      console.log('⚠️  Database needs migration/seeding');
      console.log('\n📋 Follow QUICK_START.md for setup instructions');
    }

    await connection.end();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDB();
