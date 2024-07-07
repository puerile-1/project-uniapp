## 生成项目：

-npx degit dcloudio/uni-preset-vue#vite-ts vue3-uniapp-template

### 1、引入 prerttier + eslint + stylelint

- .editorconfig 文件
- .prettierrc.js 文件
- .eslintrc.js 文件

  - pnpm add -D eslint eslint-config-airbnb-base eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-prettier eslint-plugin-vue @typescript-eslint/eslint-plugin @typescript-eslint/parser vue-global-api

- .stylelintrc.js 文件
  - pnpm add -D stylelint stylelint-config-html stylelint-config-recess-order stylelint-config-recommended-vue stylelint-config-standard stylelint-config-standard-scss postcss postcss-html postcss-scss sass

安装依赖
pnpm i -D husky lint-staged commitlint @commitlint/cli @commitlint/config-conventional

2-2 再执行：npx husky install （现在是 npx husky init），并且在 package.json的scripts里面增加 "prepare": "husky install",（其他人安装后会自动执行） 根目录会生成 .hushy 文件夹， 最后执行 echo "npx --no-install -- lint-staged" > .husky/pre-commit 即可。
