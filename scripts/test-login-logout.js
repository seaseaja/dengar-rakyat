const { loadEnvConfig } = require("@next/env");

loadEnvConfig(process.cwd());

async function testLoginLogout() {
  console.log("🔐 Testing login and logout flow...");
  
  // Step 1: Login
  console.log("\n1. Testing login...");
  const loginResponse = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: 'pusat@dengarrakyat.id',
      password: 'pusat123'
    })
  });
  
  console.log(`Login Status: ${loginResponse.status} ${loginResponse.statusText}`);
  const loginData = await loginResponse.json();
  console.log('Login Response:', JSON.stringify(loginData, null, 2));
  
  // Get cookies from response
  const setCookieHeader = loginResponse.headers.get('set-cookie');
  console.log('Set-Cookie Header:', setCookieHeader);
  
  if (!loginResponse.ok) {
    console.error('❌ Login failed');
    return;
  }
  
  // Step 2: Get CSRF token
  console.log("\n2. Getting CSRF token...");
  const csrfResponse = await fetch('http://localhost:3000/api/auth/csrf', {
    headers: {
      'Cookie': setCookieHeader || ''
    }
  });
  
  console.log(`CSRF Status: ${csrfResponse.status} ${csrfResponse.statusText}`);
  const csrfData = await csrfResponse.json();
  console.log('CSRF Response:', JSON.stringify(csrfData, null, 2));
  
  if (!csrfResponse.ok) {
    console.error('❌ CSRF token failed');
    return;
  }
  
  // Step 3: Logout
  console.log("\n3. Testing logout...");
  const logoutResponse = await fetch('http://localhost:3000/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfData.token || '',
      'Cookie': setCookieHeader || ''
    }
  });
  
  console.log(`Logout Status: ${logoutResponse.status} ${logoutResponse.statusText}`);
  const logoutData = await logoutResponse.json();
  console.log('Logout Response:', JSON.stringify(logoutData, null, 2));
  
  const logoutCookieHeader = logoutResponse.headers.get('set-cookie');
  console.log('Logout Set-Cookie Header:', logoutCookieHeader);
  
  if (logoutResponse.ok) {
    console.log('✅ Logout successful');
  } else {
    console.error('❌ Logout failed');
  }
  
  // Step 4: Verify session deleted
  console.log("\n4. Verifying session is deleted...");
  const verifyResponse = await fetch('http://localhost:3000/api/auth/csrf', {
    headers: {
      'Cookie': setCookieHeader || ''
    }
  });
  
  console.log(`Verify Status: ${verifyResponse.status} ${verifyResponse.statusText}`);
  
  if (verifyResponse.status === 401) {
    console.log('✅ Session properly invalidated');
  } else {
    console.log('⚠️  Session may still be active');
  }
}

testLoginLogout().catch(console.error);