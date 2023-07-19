.DEFAULT_GOAL := serve

help: ## Show all Makefile targets
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

update: ## Update Quartz to the latest version on Github
	which go
	go install github.com/jackyzha0/hugo-obsidian@latest
	git remote show upstream || (echo "remote 'upstream' not present, setting 'upstream'" && git remote add upstream https://github.com/jackyzha0/quartz.git)
	git fetch upstream
	git log --oneline --decorate --graph ..upstream/hugo
	git checkout -p upstream/hugo -- layouts .github Makefile assets/js assets/styles/base.scss assets/styles/darkmode.scss config.toml data

update-force: ## Forcefully pull all changes and don't ask to patch
	which go
	go install -tags extended github.com/gohugoio/hugo@latest
	hugo version
	go install github.com/jackyzha0/hugo-obsidian@latest
	hugo version
	git remote show upstream || (echo "remote 'upstream' not present, setting 'upstream'" && git remote add upstream https://github.com/jackyzha0/quartz.git)
	git fetch upstream
	git log --oneline --decorate --graph ..upstream/hugo
	git checkout -p upstream/hugo -- layouts assets/js assets/styles/base.scss assets/styles/darkmode.scss config.toml data
	git shortlog --max-count 5
	${GOPATH}/bin/hugo-obsidian -input=content -output=assets/indices -index -root=.
	hugo --minify
	ls -laR assets
# git remote show upstream || (echo "remote 'upstream' not present, setting 'upstream'" && git remote add upstream https://github.com/djshafran/kb.git)
# git fetch upstream
# git checkout upstream/hugo -- layouts .github Makefile assets/js assets/styles/base.scss assets/styles/darkmode.scss config.toml data
# git checkout upstream/hugo -- layouts assets/js assets/styles/base.scss assets/styles/darkmode.scss config.toml data
#	export PATH=${GOPATH}/bin:${PATH}
#	echo ${PATH}

serve: ## Serve Quartz locally
	hugo server --enableGitInfo --minify --bind=$(or $(HUGO_BIND),0.0.0.0) --baseURL=$(or $(HUGO_BASEURL),http://localhost) --port=$(or $(HUGO_PORT),1313) --appendPort=$(or $(HUGO_APPENDPORT),true) --liveReloadPort=$(or $(HUGO_LIVERELOADPORT),-1)

docker: ## Serve locally using Docker
	docker run -it --volume=$(shell pwd):/quartz -p 1313:1313 ghcr.io/jackyzha0/quartz:hugo
