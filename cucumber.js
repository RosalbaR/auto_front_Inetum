module.exports = {
  default: [
    '--require-module', 'ts-node/register',
    '--require', 'support/*.ts',
    '--require', 'step-definitions/*.ts',
    '--format', 'html:cucumber-report.html',
    '--format', 'progress-bar',
    'features/*.feature'
  ]
};
