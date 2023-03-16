#Vanilla: Create a template Vanilla JS in project folder [name] and open a VSCode in that folder.

alias Vanilla='function _newproject() {
    if [ -z "$1" ]; then
        printf "Error: Please provide a project name.\n"
        return 1
    fi

    local project_dir="$HOME/linux-coding-environment/Projects"
    local target_dir="${project_dir}/${1}"

    if [ -n "$2" ]; then
        target_dir="${target_dir}/${2}"
    fi

    mkdir -p "$target_dir"
    rsync -av --exclude=node_modules ~/linux-coding-environment/Templates/vanilla-js-base/ "$target_dir/" > /dev/null 2>&1
    cd "$target_dir"
    code .
    npm install vite@latest --save-dev
    npm fund > /dev/null 2>&1 &&
    reset &&
    figlet VanillaJS | lolcat &&
    printf "Created %s at %s on %s\n" "$2" "${target_dir#"$HOME/linux-coding-environment"}" "$(date)" | lolcat
    printf "\033[0;37m"
    printf "To run the project:\n"
    printf "- npm run dev\n"
    printf "- click on the local address or hit [o]\n"
    printf "\033[0m"
}; _newproject'



#Tailwind: Create a template Vanilla JS with implemented Tailwind CSS in project folder [name] and open a VSCode in that folder.
alias Tailwind='function _newproject() {
    if [ -z "$1" ]; then
        printf "Error: Please provide a project name.\n"
        return 1
    fi

    local project_dir="$HOME/linux-coding-environment/Projects"
    local target_dir="${project_dir}/${1}"

    if [ -n "$2" ]; then
        target_dir="${target_dir}/${2}"
    fi

    mkdir -p "$target_dir"
    rsync -av --exclude=node_modules ~/linux-coding-environment/Templates/vanilla-js-tailwindcss/ "$target_dir/" > /dev/null 2>&1
    cd "$target_dir"
    code .
    npm install vite@latest --save-dev
    npm install tailwindcss@latest postcss@latest autoprefixer@latest --save-dev > /dev/null 2>&1 &&
    npm fund > /dev/null 2>&1 &&
    reset &&
    figlet VanillaJS + TailwindCSS | lolcat
    printf "Created %s at %s on %s\n" "$2" "${target_dir#"$HOME/linux-coding-environment"}" "$(date)" | lolcat
    printf "\033[0;37m"
    printf "To run the project:\n"
    printf "- npm run dev\n"
    printf "- click on the local address or hit [o]\n"
    printf "\033[0m"
}; _newproject'




#Alpine: Create s template AlpineJS project with implemented Tailwind CSS in project folder.
alias Alpine='function _newproject() {
    if [ -z "$1" ]; then
        printf "Error: Please provide a project name.\n"
        return 1
    fi

    local project_dir="$HOME/linux-coding-environment/Projects"
    local target_dir="${project_dir}/${1}"

    if [ -n "$2" ]; then
        target_dir="${target_dir}/${2}"
    fi

    mkdir -p "$target_dir"
    rsync -av --exclude=node_modules ~/linux-coding-environment/Templates/alpinejs-tailwind-vite/ "$target_dir/" > /dev/null 2>&1
    cd "$target_dir"
    code .
    npm install vite@latest --save-dev
    npm install alpinejs@latest --save-dev > /dev/null 2>&1 &&
    npm install tailwindcss@latest postcss@latest autoprefixer@latest --save-dev > /dev/null 2>&1 &&
    npm fund > /dev/null 2>&1 &&
    reset
    figlet AlpineJS + TailwindCSS | lolcat
    printf "Created %s at %s on %s\n" "$2" "${target_dir#"$HOME/linux-coding-environment"}" "$(date)" | lolcat
    printf "To run the project:\n"
    printf "- npm run dev\n"
    printf "- click on the local address or hit [o]\n"
    printf "\033[0m" &&

}; _newproject'


