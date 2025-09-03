import Jasmine from 'jasmine';
import { SpecReporter } from 'jasmine-spec-reporter';

const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: 'build/spec',
  spec_files: [

    '**/*[sS]pec.ts',
    '**/*[sS]pec.js'
  ],
  helpers: [
    'helpers/**/*.ts',
    'helpers/**/*.js'
  ],
  requires: ['ts-node/register'], 
  stopSpecOnExpectationFailure: false,
  random: false 
});

jasmine.clearReporters();
jasmine.addReporter(new SpecReporter({
  spec: {
    displayFailuresSummary: true,
    displaySpecDuration: true
  },
  colors: { enabled: true }
}));

jasmine.execute();
