import { Carousel, Typography, Button } from "@material-tailwind/react";
import slider01 from "../assets/slider01.jpg";
import slider02 from "../assets/slider02.jpg";
import slider03 from "../assets/slider03.jpg";

export function CarouselWithContent() {
    return (
        // <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <div>
            <Carousel
                className="rounded-xl"
                // autoplay={true} loop={true}
            >
                <div className="relative h-full w-full">
                    <img
                        src={slider01}
                        alt="image 1"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full_ w-full place-items-center ">
                        <div className="w-3/4 text-center md:w-3/4 ">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl text-green-900"
                            >
                                <span className="bg-white/75 pl-3 pr-3">
                                    {" "}
                                    Votre Bilan Santé gratuit
                                </span>
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-5 opacity-95 bg-white/75 text-green-900"
                            >
                                Nos conseils et informations sur les sujets
                                suivants :<br></br> Stress, sommeil, fatique |
                                Vitamines, Minéraux et Oligo-éléments | Muscles
                                et Articulations | Troubles féminins, Grossesse,
                                ménopause | Peau, Cheveau et Ongles
                            </Typography>
                            <div className="flex justify-center gap-1 bg-black/75_">
                                <Button
                                    size="lg"
                                    color="white"
                                    className="bg-white text-xl text-green-900 shadow-blue-gray-50 border-spacing-1 border-deep-orange-800 border-2 shadow-xl  hover:bg-slate-600 "
                                    // className="px-6 py-2 text-xl transition-colors duration-300 rounded rounded-full shadow-xl bg-slate-500 hover:bg-slate-600 text-slate-100 shadow-slate-400"
                                >
                                    Commencez
                                </Button>
                                {/* <Button size="lg" color="white" variant="text">
                                    Gallery
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full w-full">
                    <img
                        src={slider02}
                        alt="image 2"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full w-full items-center ">
                        <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-3xl md:text-4xl lg:text-5xl leading-5"
                            >
                                <span className="bg-white/75 text-green-900 pl-2 pr-2 leading-7">
                                    Vitamines, Minéraux et Oligo-éléments
                                </span>
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="bg-white/75 text-green-900 mb-3 opacity-95"
                            >
                                Booster mes défenses immunitaires, Améliorer ma
                                convalescence post - infection / opération,
                                Diminuer mes chutes de cheveux, Favoriser ma
                                cicatrisation, Diminuer mes problèmes de peau,
                                Booster ma fértilité...
                            </Typography>
                            <div className="flex gap-2">
                                <Button size="lg" color="white">
                                    <span className="text-xl">
                                        Commencez mon bilan santé
                                    </span>
                                </Button>
                                {/* <Button size="lg" color="white" variant="text">
                                    Gallery
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative h-full w-full">
                    <img
                        src={slider03}
                        alt="image 3"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 grid h-full w-full items-end ">
                        {/* <div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32 mt-12"> */}
                        <div className="w-3/4 pl-2 pb-12 md:w-2/4 md:pl-80 md:pb-20 lg:pl-32 lg:pb-32 mt-12 ml-52">
                            <Typography
                                variant="h1"
                                color="white"
                                className="mb-4 text-2xl md:text-4xl lg:text-4xl bg-white/75 text-green-900 p-2"
                            >
                                Troubles féminins, Grossesse, Ménopause
                            </Typography>
                            <Typography
                                variant="lead"
                                color="white"
                                className="mb-3 opacity-90 bg-white/75 text-green-900 p-2"
                            >
                                Grossesse, Ménopause : Bouffées de chaleur,
                                Transpiration excessive, Sécheresse des
                                muqueuses, Règles abondantes et longues, Règles
                                douloureuses...
                            </Typography>
                            <div className="flex gap-2">
                                <Button size="lg" color="white">
                                    <span className="text-xl">
                                        Commencez mon bilan santé
                                    </span>
                                </Button>
                                {/* <Button size="lg" color="white" variant="text">
                                    Gallery
                                </Button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}
