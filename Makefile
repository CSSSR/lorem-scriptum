# *********************** DEVELOPMENT ***********************
dev:
	yarn eleventy --serve --quiet

build:
	rm -rf dist
	yarn eleventy
	yarn gulp build

# *********************** CHECKS ***********************
lint-staged:
	yarn lint-staged

lint-commit-msg:
	yarn commitlint --edit $1

lint-fix-css:
	yarn prettier src/styles/**/*.css --write
	yarn stylelint src/styles/**/*.css --fix
