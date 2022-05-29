import './home.css'



const Home = () => {
    return (
        <div className="text-center">
            <h1>Casting Spell, Taking a little while...</h1>
            <h1>Get in touch <a href="mailto:arunsinghguleria@gmail.com">with me</a></h1>
            <h1> In the mean time we can play <span className='tictactoe-url' onClick={() => window.open('/tictactoe')}>TicTacToe</span></h1>
        </div >
    );
}

export default Home;