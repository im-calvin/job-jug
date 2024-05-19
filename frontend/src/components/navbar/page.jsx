import logo from '../../assets/logo.png'

function Navbar() {
  return (
    <div className='container'>
        <div className='h-20 w-lvw mb-10 border-2 border-blac shadow-sm flex flex-col justify-center fixed bg-white'>
            <div className='w-3/4 h-fit m-auto flex flex-row justify-between'>


                <div className='flex flex-row'>
                <img className='size-10 mr-4' src={logo}></img>
                <div className=' flex flex-col justify-center'><h1>JobJug</h1></div>
                </div>

                <div className=' flex flex-row gap-3'>
                    <ul>item</ul>
                    <ul>item</ul>
                    <ul>item</ul>
                </div>
            </div>
        </div>
        {/* <div className='mb-20'></div> */}
    </div>
  )
}

export default Navbar;
