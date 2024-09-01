import { useState } from 'react';

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            question: "Qu'est-ce que notre service de streaming ?",
            answer: "Notre service de streaming vous permet de regarder des vidéos inédites et souvent censurées pour leur contenus informatifs dérangeants. Des films et des séries libres de droit vont naitre ici faites par des auteurs maitrisant les ia."
        },
        {
            question: "Comment puis-je m'abonner ?",
            answer: "Vous pouvez vous abonner en visitant notre page Premium dont le lien se trouve dans le menu déroulant en haut à droite et en suivant les instructions sur la page."
        },
        {
            question: "Quels sont les avantages de l'abonnement premium ?",
            answer: "L'abonnement premium vous donne accès à des contenus exclusifs, sans publicité, et à des fonctionnalités avancées telles que des jeux videos nourris d'informations, des concours pour gagner des NFT. Selon votre mode d'abonnement vous recevrez livre papier, ebook ou NFT dans votre terrier personnel."
        },
        {
            question: "Pourquoi Conspix offre des NFT alors que c'est de la merde et que c'est très polluant ?",
            answer: "Les NFT de conspix ne sont pas basés sur du génératif sans ethique et pollueur par le stockage. Ce sont des memes renfermant tous une information ou bien des oeuyres d'art unique non fait par IA sur lesquels les plus chanceux tomberont. Nous croyons que les NFT à véritables valeurs humaines vont supplanter les créations par hybridation de données (ia), les meilleurs MNFT demeurent les memes prédictif dont la date est antérieure à l'événement auquel ils font allusion."
        },
        {
            question: "Comment puis-je contacter le support technique ?",
            answer: "Vous ne pouvez pas, je suis tout seul. Et maintenant que le site est en ligne, je dois travailler comme un esclave pour me repayer à manger. tabascocity@tutanota.com."
        },
        {
            question: "Comment je récupère mes NFT de la Memeral Reserv ?",
            answer: "Les NFT sont gérés avec l'horrible plateforme opensea pour le moment, je vais essayer de faire mieux coté ethique, mais dessus il vous est facile de les vendre ou de vous en séparer."
        },
        {
            question: "Comment je poste des videos et des articles ?",
            answer: "Très simple. Choisissez un abonnement, votre dashboard vous donnera accès au formulaires de postages. Sauf si vous etes un des chanceux 100 premiers membres, pas besoin d'abonnement pour poster, créer un profil suffit. Toutefois vos posts sont controlés un minimum."
        },
        {
            question: "Comment Conspix finance la Pastèque ?",
            answer: " Directement avec des gofundme de personnes avec qui nous sommes en contact direct, les versements sont au nom de la société TabascoCity, fondatrice de Conspix. "
        },
        {
            question: "A quoi sert le Subway ?",
            answer: "Ces lignes de metro répertorie par catégories le savoir et chaque station est censée avoir un degré de profondeur dans le domaine de la ligne, toutefois il ne me sera pas évident de respecter scrupulusement le schema. Parcourir le subway fait gagner des NFT et des passedroits."
        },
        
        {
            question: "Est-ce que Conspix est sûr au niveau de l'anonymat ?",
            answer: "Mec, meme Tor n'est pas sûr. Le site utilise tout de meme la derniere version  d'auhentification, ne vous demande aucune donnée personnelle, n'enregistre meme pas votre ip. Et vos paiements sont sécurisé comme tous les autres en ligne par des plateformes dédiées aux paiements sécurisés."
        },
        {
            question: "Quand sortira le jeu Future 404 ?",
            answer: "Il est en fabrication , mais ça coute beaucoup de temps et d'argent, on est espère printemps 2025 avec quelques films inédits."
        },
        {
            question: "Comment je me désabonne de Conspix ?",
            answer: 'Il y a un bouton "supprimer votre compte" en bas de votre terrier personnel. Si c\'est un abonnement Premium et que vous ne voulez tout simplement pas que votre pseudo, vos films favoris et vos NFT soient conservés pour vous. Tout sera perdu, c\'est vous qui voyez !'
        }
    ];

    const toggleAccordion = (index : any) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-opacity-60 bg-gradient-to-r from-stone-300 to-stone-600 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-center mb-6 text-rose-700 hover:text-rose-500">FAQ</h1>
            <div className="space-y-4">
                {faqData.map((item, index) => (
                    <div key={index} className="border-b border-gray-200">
                        <button
                            className="w-full text-left py-4 px-6 bg-gray-950 hover:bg-stone-300 hover:text-gray-700 focus:outline-none"
                            onClick={() => toggleAccordion(index)}
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">{item.question}</span>
                                <span>{activeIndex === index ? '-' : '+'}</span>
                            </div>
                        </button>
                        {activeIndex === index && (
                            <div className="py-4 px-6 bg-gradient-to-r from-amber-100 to bg-pink-100">
                                <p className="text-gray-800">{item.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
