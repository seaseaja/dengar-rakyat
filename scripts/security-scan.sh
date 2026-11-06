#!/bin/bash

# Security Scan Script - Iterasi 3 P3
# Run all security checks

echo "🔍 Running Security Scans..."
echo ""

# 1. npm audit
echo "📦 [1/4] Running npm audit..."
npm audit --audit-level=moderate

# 2. Gitleaks (if installed)
echo ""
echo "🔐 [2/4] Running Gitleaks secret scan..."
if command -v gitleaks &> /dev/null; then
    gitleaks detect --config .gitleaks.toml --verbose
else
    echo "⚠️  Gitleaks not installed. Install: brew install gitleaks"
fi

# 3. Check for hardcoded secrets in .env
echo ""
echo "🔑 [3/4] Checking .env files..."
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local exists - ensure it's in .gitignore"
    if git check-ignore .env.local > /dev/null; then
        echo "✅ .env.local is ignored by git"
    else
        echo "❌ WARNING: .env.local is NOT in .gitignore!"
    fi
else
    echo "✅ No .env.local file"
fi

# 4. Check for TODO SECURITY comments
echo ""
echo "📝 [4/4] Checking for TODO SECURITY comments..."
grep -r "TODO.*SECURITY" --include="*.ts" --include="*.tsx" . || echo "✅ No security TODOs found"

echo ""
echo "✅ Security scan complete!"
