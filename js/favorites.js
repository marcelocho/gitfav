class GithubUser {
    static search(username) {
        const endpoint = `https://api.github.com/users/${username}`

        return fetch(endpoint)
        .then(data => data.json())
        .then(({ login, name, public_repos, followers}) => ({
            login,
            name,
            public_repos,
            followers
        }))
    }
}

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem(`@github-favorites:`)) || []
    }

    save() {
        localStorage.setItem(`@github-favorites:`, JSON.stringify(this.entries))
    }

    async add(username) {
        try {

            const userExists = this.entries.find(entry => entry.login === username)

            if(userExists) {
                throw new Error(`Usuário já cadastrado`)
            }    

            const user = await GithubUser.search(username)

            if(user.login === undefined) {
                throw new Error(`Usuário não encontrado!`)
            }

            this.entries = [user, ...this.entries]
            this.update()
            this.save()

        }
        catch (error) {
            alert(error.message)
        }
    }

    delete(user) {
        const filteredEntries = this.entries
            .filter(entry => entry.login !== user.login)

        this.entries = filteredEntries
        this.update()
        this.save()
    }
}


export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)

        this.tbody = this.root.queryselector('table tbody')

        this.update()
        this.onadd()
    }

    onadd() {
        const addButton = this.root.querySelector(".search button")
        addButton.onclick = () => {
            const { value } = this.root.querySelector('.search input')

            this.add(value)
        }
    }

    update() {
        this.removeAllTr()

        this.entries.forEach( user => {
            
        })
    }



}