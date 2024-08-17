import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const GridThumbnails = () => {
  return (
    <div>
        <div className="w-full flex justify-center pt-32 col-span-full">
          <Image src="/img/advised3.png" width={600} height={450} alt="advised content picture presents:" />
        </div>
        <div className="w-[70%] mx-auto flex flex-col items-center">
          <h1 className="text-neutral-600  font-kghappy mt-16 text-2xl tracking-wide"><img src="/img/top50.png" width="120px" className="mx-auto" /> des films tendances distribués par Conspix</h1>
          <Link href="/auth" className="text-neutral-600  hover:text-red-400">Connectez-vous pour visionner le top 100 et plus encore !</Link>
        </div>
         
        <div className="vitrine bg-green-950 mx-auto w-[90%] mt-8 p-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-black border-2 text-white">
        <div className="thumbnail">
          <h3>All eyes on Rafah</h3>
          <img src="/thumbnails/69-middle-east/rafah.webp" alt="All eyes on Rafah can't be censored" />
          <p>Catégorie: Libération Mondiale (???)</p>
          <p>Nous , le monde, nous commençons par Rafah, car nous savons qu'ils ne font qu'amorcer leur plan d'asservitude mondiale, nous libérerons tous les opprimés, et supprimerons toute puissance d'actions aux oppresseurs
          </p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
          <div className="thumbnail">
          <h3>Chalgum</h3>
          <img src="/thumbnails/alert-launchers/chalgum-hat.png" alt="" />
          <p>Catégorie: Lanceurs d'alerte (???)</p>
          <p>Jouer au plus idiot peut être un signe d'intelligence, surtout quand on veut soit prendre toute une communauté en otage,
            soit se libérer de menaces sur sa famille
          </p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Balls Out</h3>
          <img src="/thumbnails/transworld/ballsout.png " alt="" />
          <p>Catagories: TransWorld & MKutlra</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>GTA, the Peter Palmer saga</h3>
          <img src="/thumbnails/alert-launchers/gta6.webp" alt="" />
          <p>Categorie: slaves and celebs</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Burn Netflix Before <span className="safe-font">(coming)</span></h3>
          <img src="/thumbnails/77-being-complotist/burnnetflix.png" alt="" />
          <p>Categorie: Wake up</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        
        <div className="thumbnail">
          <h3>Challenger <span className="safe-font">-version 1986-</span></h3>
          <img src="/thumbnails/nasa/return.webp" alt="" />
          <p>Categorie: Nasa lies</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Bilder Burger <span className="safe-font">3</span></h3>
          <img src="/thumbnails/70-africa-korps/bilder.png" alt="" />
          <p>Categorie: Afrika Korps</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>The Crime<span className="safe-font">-J</span></h3>
          <img src="/thumbnails/69-middle-east/crimej.png" alt="" />
          <p>Categorie: Middle-East</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Dans les secrets des lois</h3>
          <img src="/thumbnails/laws/secretsoflaws.jpg" alt="" />
          <p>Categorie: Lois</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div> 
    
        <div className="thumbnail">
          <h3>PCR HERO PCR HERO</h3>
          <img src="/thumbnails/pcr/pcrhero.webp" alt="" />
          <p>Categorie : Masks & PCR </p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div> 
      
        <div className="thumbnail">
          <h3>Une enquete pour Khabi Lame</h3>
          <img src="thumbnails/58-bluebeam-evolution/columbo.webp" alt="" />
          <p>Categorie: Blue-Beam Yal1-evolution</p>
          <p>Le chili et Hawai: tellement évident que beaucoup repeignent leur maison en bleu. Suivez Columbo et Khabi Lame qui enquête ensemble sans jamais avoir à fouiner</p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Fact Checker</h3>
          <img src="/thumbnails/mediacontrol/factjoker.webp" alt="" />
          <p>Categorie: Media Control</p>
          <p>Fine-Qelle-Croute incarnait le joker des médias.
            Suivez la descente aux enfers médiatique d'un serieux emmerdeur emmerdé... devenu un clown de merde</p>
          <button>
              <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>SurHunted By them</h3>
          <img src="/thumbnails/mediacontrol/surhunted7364.webp" alt="" />
          <p>Categorie: Pedo Satano Land</p>
          <p>Hollywood et ses victimes, parfois elles peuvent parler, et parfois il faut enquêter avec elles sur celles rester dans le silence, jusqu'où l'abysse fera des révélations ?</p>
          <button>
              <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>The reptilian<span className="safe-font">'s</span> advocate</h3>
          <img src="/thumbnails/mediacontrol/reptilian.jpg" alt="" />
          <p>Categorie: Media-Control</p>
          <p>Et si on se mettait d'accord sur le fait qu'ils soient reptiliens, que ce soit vrai ou faux, ça pourrait bien regler pas mal de problèmes</p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Fog Gun</h3>
          <img src="/thumbnails/51-chemtrails&haarp-seisme-bluebbeam/foggun.webp " alt="" />
          <p>Catagorie: Chemtrails</p>
          <p>Tom Cruise te montre la différence entre une chembombs et des chemtrails, à quoi servent les métaux lourds dans le ciel, et combien ça rapporte</p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>SECRECY ONE</h3>
          <img src="/thumbnails/60-hidden-history-policy-truth/secrecy_1.png" alt="" />
          <p>Categorie: Historical-truth</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>The Hardest Boycott</h3>
          <img src="/thumbnails/78-wake-up/hboycott.webp" alt="" />
          <p>Categorie: wake up</p>
          <p>Il ne s'agit pas de seulement quelques grandes surfaces, de marques et d'une star très à la masse. Quand on boycotte nos propres envies de conditionné, la lutte devient passionnante à regarder</p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Soma-X Fury<span className="safe-font">5G</span> Attacks</h3>
          <img src="/thumbnails/72-zombification-chosification-escalvagisation/somax.png" alt="" />
          <p>Categorie: Chosification / Esclavage mondial</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3><span className="safe-font">5G</span> Attacks</h3>
          <img src="/thumbnails/50-5G&tech/attak2.webp" alt="" />
          <p>Categorie: 5G</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Terre Rare</h3>
          <img src="/thumbnails/70-africa-korps/terrerare.webp" alt="" />
          <p>Categorie: Afrika-Korps</p>
          <p></p>
          <button>
              <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Boudjekada: The Publisher</h3>
          <img src="/thumbnails/alert-launchers/publisher.webp" alt="" />
          <p>Catgeorie: Lanceurs d'alerte</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>It s WWIII but black friday matters</h3>
          <img src="/thumbnails/78-wake-up/bfb.webp" alt="" />
          <p>Categorie: Wake Up</p>
          <p></p>
          <button>
              <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Un film <span className="safe-font">français</span> mais bien</h3>
          <img src="/thumbnails/77-being-complotist/chianbranl.webp" alt="" />
          <p>Categorie: Being Complotist</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>MORTVEUL GRAPHMEN -evolution- </h3>
          <img src="/thumbnails/oxydedegraphene/graphmen.webp" alt="" />
          <p>Categorie : Oxyde de Graphene</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Ugly is the new Act</h3>
          <img src="/thumbnails/61-hidden-projects-now/ugly.webp" alt="" />
          <p> Categorie: Hidden Projects</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Is there puppets for phase 4?</h3>
          <img src="thumbnails/58-bluebeam-evolution/puppets.webp" alt="" />
          <p>Categorie: Blue-Beam Yal1-evolution</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
      
        <div className="thumbnail">
          <h3>The greatest Landstealing</h3>
          <img src="/thumbnails/69-middle-east/landsteal.jpg" alt="" />
          <p>Categorie: WarMongers</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>

        <div className="thumbnail">
          <h3>Objectification</h3>
          <img src="/thumbnails/72-zombification-chosification-escalvagisation/objectifi.png" alt="" />
          <p>Categorie: Zombification / Esclavagisation </p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Lucri-Ferous</h3>
          <img src="/thumbnails/banks&hydra/lucri.png" alt="" />
          <p>Categorie: Banks & Hydra</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Bipartism</h3>
          <img src="/thumbnails/bipartism/bipartism.png" alt="" />
          <p>Categorie : Political Fraud</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>The conspix Iceberg</h3>
          <img src=" /thumbnails/77-being-complotist/alger.webp" alt="" />
          <p>Categorie: High Level</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>All you love, We hate</h3>
          <img src=" /thumbnails/77-being-complotist/allulove.webp" alt="" />
          <p>Categorie: TV Brainwashing</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>The CFA <span className="safe-font">empire's</span> fall</h3>
          <img src="/thumbnails/70-africa-korps/cfa.png" alt="" />
          <p>Categorie: Afrika-Korps</p>
          <p></p>
          <button>
              <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>The  <span className="safe-font">Simpsons </span>season Epstein</h3>
          <img src="/thumbnails/77-being-complotist/simpson.webp" alt="" />
          <p>Catégorie : PizzaGate</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Rockies X(y)</h3>
          <img src="/thumbnails/transworld/rookiesX.webp" alt="" />
          <p>Categorie: TransWorld</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Funny Era</h3>
          <img src="/thumbnails/tv&programmation/funnyera.webp" alt="" />
          <p>Categorie: TV Brainwashing</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>ElectroWar</h3>
          <img src="/thumbnails/50-5G&tech/electro.webp" alt="" />
          <p>Catégorie: 5G</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
      
        <div className="thumbnail">
          <h3>CERN the DOOR</h3>
          <img src="/thumbnails/50-5G&tech/cern.jpg" alt="" />
          <p>Categorie: Djinn & sciences</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>HAWAI <span className="safe-font">& I </span>KNOW THAT REFERENCE</h3>
          <img src="/thumbnails/50-5G&tech/hawai2.webp" alt="" />
          <p>Categorie: Blue-Beam Yal1-evolution</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
      
        <div className="thumbnail">
          <h3>Spent my life watching series</h3>
          <img src="/thumbnails/tv&programmation/hawks.webp" alt="" />
          <p>Categorie: TV Brainwashing</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Jim carrey a un peu  <span className="safe-font">essayé</span></h3>
          <img src="/thumbnails/78-wake-up/hard.webp" alt="" />
          <p>Categorie: Wake up</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3> <span className="safe-font">L'industrie</span> des dinosaures</h3>
          <img src="/thumbnails/59-historical-hoaxes-till-climatechange/manuf.png" alt="" />
          <p>Categorie: Big Hoaxes</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>AVC NEWS BlueBeam World Cup</h3>
          <img src="thumbnails/58-bluebeam-evolution/warfare.webp" alt="" />
          <p>Categorie: Blue-Beam Yal1-evolution</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        
        <div className="thumbnail">
          <h3>Genetech</h3>
          <img src="/thumbnails/50-5G&tech/oldcairo.webp" alt="" />
          <p>Categorie: 5G</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
      
        <div className="thumbnail">
          <h3>Les chronqiues de Brigittrogn</h3>
          <img src="/thumbnails/politics/chroniques.png" alt="" />
          <p>Categorie: Political Fraud</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>La solution de trois quarts</h3>
          <img src="/thumbnails/nasa/solution.png" alt="" />
          <p>Categorie: Nasa lies</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Le periple de l'OPAL de feu</h3>
          <img src="/thumbnails/2-etymology/opaldefeu.png" alt="" />
          <p>Categorie: Etymologie</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        <div className="thumbnail">
          <h3>Isis est Iblis</h3>
          <img src="/thumbnails/2-etymology/is.webp" alt="" />
          <p>Categorie: Etymology</p>
          <p></p>
          <button>
          <Link href="/auth">Voir film</Link>
          </button>
        </div>
        
        </div>
    
   
    </div>
  )
}

export default GridThumbnails
