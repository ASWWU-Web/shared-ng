# Setting up a new Angular Project

1. generate a new project with AngularCLI
2. add the ng-shared submodule to the new project
    1. from project root run `git clone git@github.com:ASWWU-Web/shared-ng.git src/shared-ng`
    2. then run `git submodule add git@github.com:ASWWU-Web/shared-ng.git src/shared-ng`
    3. to clone a project that already has submodules run `git clone --recursive [repo URL]`, or `git submodule update --init --recursive` if you've already cloned the parent repository.
    4. more submodule related comands here: http://www.vogella.com/tutorials/GitSubmodules/article.html
3. Update the `app.module.ts`, `package.json`, and `index.html` files using the `examples` folder as a guide.
4. Add `"src/shared-ng/bootstrap-overrides.css", "src/shared-ng/styles.css",` (In that order! before `"src/styles.css"`) to the angular.json file to `projects.app-name.architect.build.options.styles`, and add `"src/shared-ng/favicon.ico"` to `projects.app-name.architect.build.options.assets`.
5. update the environment import in `main.ts` to be 
   ```typescript
   import { environment } from './shared-ng/environments/environment';
   ```