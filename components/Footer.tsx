const Footer = () =>{
    return (
        <div className="w-full h-64 netflix transition border-opacity-60
         border-t-rose-700 border-t-2 mt-5 pt-3">
            <ul className="flex flex-row justify-evenly text-zinc-700 items-center h-24">
                <li className="flex items-center justify-between w-[400px]"><a href="#" target="_blank">
                    <img src="/icons/tbcity.png" alt="logo tabascocity" width="250"
                 className="w-32 opacity-70 hover:opacity-100 glowy transition" /></a>
                 <p className="text-center p-4 hover:text-white hover:opacity-60">Capital Center of this websites ecosystem</p>
                 </li>

                <li className="flex items-center justify-around w-[400px]"><a href="#" target="_blank">
                    <img src="/icons/shonen-detoured.png" alt="logo tabascocity" width="150"
                 className="opacity-70 hover:opacity-100 glowy transition" /></a>
                 <p className="text-center p-4 hover:text-white hover:opacity-60">Shonen.industries:<br/> become a famous mangaka !</p>
                 </li>



                <li className="flex items-center justify-between w-[400px]"><a href="#" target="_blank">
                    <img src="/icons/artgold.png" alt="logo artnfact" width="150"
                 className="w-24 opacity-70 hover:opacity-100 glowy transition" /></a>
                 <p className="text-center p-4 hover:text-white hover:opacity-60">ArtNfact.art: <br/>Exchange your art with gold & crypto</p>
                 </li>

            </ul>

            <ul className="flex flex-row justify-evenly text-zinc-700 items-center h-24">
                <li className="flex items-center justify-between w-[350px]"><a href="#" target="_blank">
                    <img src="/icons/logo6.png" alt="doxa" width="150" 
                    className="w-48 opacity-70 hover:opacity-100 glowy transition" />
                </a><p className="text-center p-4 hover:text-white hover:opacity-60">Tshirts.land:<br/>Play and win your best T-shirts</p>
                </li>

                <li className="flex items-center justify-between w-[350px]"><a href="#" target="_blank">
                    <img src="/icons/podcast2.png" alt="logo tabascocity"
                 className="w-64 opacity-70 hover:opacity-100 glowy transition" /></a>
                 <p className="text-center p-4 hover:text-white hover:opacity-60">Podcast.press:<br/>Give a public to your Podcasts</p>
                 </li>
              
                
                <li className="flex items-center justify-between w-[400px]"><a href="#" target="_blank">
                    <img src="/icons/zz-lemon.png" alt="logo zarmazon" width="350"
                    className="w-40 opacity-70 hover:opacity-100 glowy transition" />
                </a><p className="text-center p-4 hover:text-white hover:opacity-60">Algerian Ecommerce<br/>Zarmazon prime concurrence<br/> <i>Serious Soon !</i></p></li>
                
                
            </ul>
            <div className="text-white flex items-center justify-center font-bebas tracking-wider mt-4">
               This &nbsp; serie &nbsp; of &nbsp; websites &nbsp; is &nbsp; exclusive &nbsp; Property &nbsp;
                of &nbsp; naïmé &nbsp; tabasco &nbsp; in &nbsp; heritance &nbsp; from &nbsp; O. Opal, &nbsp; ©2013-2023
            </div>
        </div>
    )
}

export default Footer;