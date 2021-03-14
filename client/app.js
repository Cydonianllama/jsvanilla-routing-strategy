/* init routing system */
var routesApp = []
var config = {
    rootMounting: ''
}
var notFoundMemo = {}

const ERROR_ROUTER_NEED_ROOT_MOUNTING_POINT = 'ERROR_ROUTER_NEED_ROOT_MOUNTING_POINT'
const ERROR_ROUTER_BAD_CONFIGURATION_ROUTES = 'ERROR_ROUTER_BAD_CONFIGURATION_ROUTES'
const ERROR_ROUTES_NEED_SET_CONFIGURATION = 'ERROR_ROUTES_NEED_SET_CONFIGURATION'
const ERROR_ROUTES_NEED_AN_OBJECT_FOR_ADD_ROUTES = 'ERROR_ROUTES_NEED_AN_OBJECT_FOR_ADD_ROUTES'

const setConfiguratuion = (conf) => {
    if (!conf.rootMounting) {
        console.error(ERROR_ROUTER_NEED_ROOT_MOUNTING_POINT);
    }else{
        config = conf
    }
}

const setRoutes = (routes) => {
    if (!routes) console.error(ERROR_ROUTES_NEED_AN_OBJECT_FOR_ADD_ROUTES);
    routes.forEach(route => {
        if (!route.name && !route.component) console.error(ERROR_ROUTER_BAD_CONFIGURATION_ROUTES);
        else {
            if (route.name === '404'){  
                notFoundMemo = route
            }else{
                routesApp.push(route)
            }
        }
    })
}

const renderRoute = (route) => {
    const container = document.getElementById(config.rootMounting)
    container.innerHTML = ''
    route.component.render(container)
}

const setRouteInLocalStorage = (route) => {
    localStorage.setItem('currentPage', route.name)
}

const renderNotFound = () => {
    renderRoute(notFoundMemo)
}

const router = (hash) => {

    let founded = false

    if (!config.rootMounting) {
        console.error(ERROR_ROUTES_NEED_SET_CONFIGURATION);
        return
    }

    for (route of routesApp) {
        if (hash === route.name) {
            renderRoute(route)
            setRouteInLocalStorage(route)
            founded = true
        }
    }

    if (!founded) {
        renderNotFound()
    }

}
/* finish routing system */

/* UI components */

/* UI PAGES */
class HomePage {

    constructor() {

    }

    listeners() {

    }

    getTemplate() {
        let div = document.createElement('div')
        let template = `hola mundo 
            <a href = "#">home</a>
            <a href = "#dashboard">dashboard</a>
            `
        div.innerHTML = template
        return div
    }

    componentDidUpdate() {

    }

    componentDidMount() {

    }

    componentDidUnmount() {

    }

    render(container) {
        let component = this.getTemplate()
        container.append(component)
    }

}

class Dashboard {

    constructor(){

    }

    listeners(){

    }

    getTemplate(){
        let div = document.createElement('div')
        let template = ` 
            this is my dahboard
            <a href = "#">home</a>
            <a href = "#dashboard">dashboard</a>
        `
        div.innerHTML = template
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

}

class NotFoundPage {

    constuctor(){

    }

    listeners(){

    }

    getTemplate(){
        let div = document.createElement('div')
        let template = `
            not found
            <a href = "#">home</a>
            <a href = "#dashboard">dashboard</a>
        `
        div.innerHTML = template
        return div
    }

    render(container){
        let component = this.getTemplate()
        container.append(component)
        this.listeners()
    }

}

const homePage = new HomePage()
const notFoundPage = new NotFoundPage()
const dashboard = new Dashboard()

const myroutes = [
    {
        name : '',
        component : homePage
    },
    {
        name : '404',
        component : notFoundPage
    },
    {
        name : 'dashboard',
        component : dashboard
    }
]

setConfiguratuion({
    rootMounting: 'root'
})
setRoutes(myroutes)

const app = () => {

    let route = ''
    if (!localStorage.getItem('currentPage') ){
        console.log('route :',localStorage.getItem('currentPage'));
        localStorage.setItem('currentPage','')
    }

    window.onhashchange = () => {
        route = location.hash.split('').map(word => { if (word !== '#') {return word }}).join('')
        localStorage.setItem('currentPage',route)
        router(localStorage.getItem('currentPage'))
    }

    router(localStorage.getItem('currentPage'))

}

app()