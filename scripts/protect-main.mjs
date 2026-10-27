// Use an administration-scoped token. Never commit the token.
const settings={required_status_checks:{strict:true,contexts:['quality','browser','database']},enforce_admins:true,required_pull_request_reviews:{dismiss_stale_reviews:true,require_code_owner_reviews:false,required_approving_review_count:0,require_last_push_approval:false},restrictions:null,required_conversation_resolution:true,allow_force_pushes:false,allow_deletions:false};
if(!process.argv.includes('--apply')){console.log(JSON.stringify(settings,null,2));console.log('Dry run only. To apply: GH_TOKEN="$(gh auth token)" node scripts/protect-main.mjs --apply');}
else{
  if(!process.env.GH_TOKEN)throw new Error('GH_TOKEN with repository administration access is required.');
  const response=await fetch('https://api.github.com/repos/aethereology/maureenella/branches/main/protection',{method:'PUT',headers:{Authorization:`Bearer ${process.env.GH_TOKEN}`,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Content-Type':'application/json'},body:JSON.stringify(settings)});
  if(!response.ok)throw new Error(`Branch protection was NOT changed: GitHub returned ${response.status}.`);
  console.log('Main protection applied. Verify it in repository Settings before merging.');
}
