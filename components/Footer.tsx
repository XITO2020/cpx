const Footer = () =>{
    return (
        <div className="w-full h-40 mt-5 netflix relative 
        bottom-0 transition border-opacity-60
         border-t-rose-700 border-t-4">
            <ul className="flex flex-row justify-evenly text-zinc-700 items-center h-24">
                <li><a href="#" target="_blank"><img src="/img/tbcity.png" alt="logo tabascocity"
                 className="w-32 opacity-70 hover:opacity-100 glowy transition" /></a></li>
                <li><a href="#" target="_blank">Shonen Dump</a></li>
                <li><a href="#" target="_blank">Memeral Reserv</a></li>
                <li><a href="#" target="_blank">Scroll You All</a></li>
                <li><a href="#" target="_blank"><img src="/img/zz-lemon.png" alt="logo zarmazon" className="w-32 opacity-100" /></a></li>
            </ul>
            <div className="text-white flex items-center justify-center font-toejam tracking-wider">
                ©2023
            </div>
        </div>
    )
}

export default Footer;