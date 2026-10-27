"""One-shot source migration on the isolated hardening branch; removes itself."""
from pathlib import Path
import runpy
import subprocess
root = Path.cwd()
branch = subprocess.check_output(['git', 'branch', '--show-current'], text=True).strip()
if branch != 'fix/production-hardening-2026-10-27':
    raise SystemExit('Refusing to apply outside the isolated hardening branch.')
names = ['audit-core.py', 'audit-delivery.py', 'audit-ui.py', 'audit-tests.py', 'audit-operations.py']
if not (root / 'app/(private)/layout.tsx').exists():
    if not (root / 'app/layout.tsx').exists():
        raise SystemExit('Original root layout not found; refusing partial migration.')
    for name in names:
        runpy.run_path(str(root / 'scripts' / name), run_name='__main__')
for name in names + ['apply-audit-fixes.py']:
    (root / 'scripts' / name).unlink(missing_ok=True)
print('Hardening source applied; temporary migration scripts removed.')
