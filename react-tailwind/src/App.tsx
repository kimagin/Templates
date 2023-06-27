import Header from './components/Header'
import Footer from './components/Footer'

function App() {
    return (
        <>
            <div className="container mx-auto flex flex-col justify-center min-h-screen">
                <Header></Header>
                <h1 className="text-slate-100 text-5xl text-center">
                    <b>React</b> + <b>TailwindCSS</b>
                    <br></br>StarterTemplate
                </h1>
                <Footer></Footer>
            </div>
        </>
    )
}

export default App
