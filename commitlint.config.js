module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-empty': [0],
    'references-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'refactor',
        'test',
        'perf',
        'chore',
        'revert',
        'ci',
        'style',
        'build',
      ],
    ],
  },
  parserPreset: {
    parserOpts: {
      // RegExp pattern check: type: JIRA-1234: subject
      headerPattern: '([a-z]*): [A-Z]+-\\d{1,4}: (.*)$',
      issuePrefixes: 'LS-',
      referenceActions: 'LS-',
    },
  },
}
