import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../axios";
import axios from "axios";
import PublicQuestionView from "../components/PublicQuestionView";
import DashboardCard from "../components/DashboardCard";
import loadingGif from "../assets/loading.svg";
import {
    ArrowRightCircleIcon,
    ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import TButton from "../components/core/TButton";

export default function GetPrestashop({ indexProduct }) {
    const answers = {};

    // const [survey, setSurvey] = useState({
    //     questions: [],
    // });
    const [loading, setLoading] = useState(false);
    const [productName, setProductName] = useState("");
    const [product, setProduct] = useState();
    const { slug } = useParams();

    useEffect(() => {
        getPrestashop(indexProduct);
        setProductName(getPrestashop(indexProduct));
    }, [indexProduct]);

    // console.log(indexProduct);

    async function getPrestashop(x) {
        //  const response = await axios.post(
        //   "https://MY_ENDPOINT.execute-api.us-east-1.amazonaws.com/v1/",
        //   API_GATEWAY_POST_PAYLOAD_TEMPLATE,
        //   { headers }
        // );
        // const data = await response.json();

        try {
            setLoading(true);
            await axios
                .get(
                    `https://shop.pharmacie-en-couleurs-eragny.com/api/products/&filter[reference]=[` +
                        x +
                        `]?display=full&output_format=JSON`,
                    {
                        headers: {
                            Authorization:
                                "BASIC SDhNVTlXQzRHUVJEV0tBRlEyM1dSWTFIQTRDUVNCUkQ=",
                        },
                    }
                )
                .then((res) => {
                    // console.log(res.data.products);

                    if (
                        res.data.products !== undefined

                        // res.data != [] &&
                        // res.data.data != [] &&
                        // res.data.products[0] !== undefined &&
                        // res.data.products[0].id !== undefined &&
                        // res.data.products !== undefined &&
                        // res.data.constructor !== Object
                    ) {
                        // console.log("res.data.products[0]");
                        // console.log(res.data.products[0]);
                        // console.log(typeof res.data.products[0]);
                        // return res.data.products[0];
                        // setProduct(res.data.products[0].name);
                        // if (typeof res.data.products[0].name === "string") {
                        // setProductName(res.data.products[0].name);
                        // console.log(x + " --- " + res.data.products[0].name);
                        setProductName(res.data.products[0].name);
                        setProduct(res.data.products[0]);
                        setLoading(false);

                        // console.log(typeof res.data.products[0].name);
                        // return res.data.products[0].name;
                        // return "res.data.products[0].name";
                        // }
                    } else {
                        setProduct(null);
                        setLoading(false);
                        return;
                    }

                    // console.log("empty");
                });
        } catch (error) {
            console.log(error);
            setLoading(false);
            return;
        }
    }

    // console.log(indexProduct);
    const regex = /(<([^>]+)>)/gi;
    // const result = text.replace(regex, "");

    return (
        <>
            {loading && (
                <div className="flex justify-center items-center">
                    <div className=" w-8 h-8" role="status">
                        <img src={loadingGif} />
                    </div>
                </div>
            )}

            {!loading && product !== null && (
                <DashboardCard
                    // title={s.title}
                    className="p-0 h-96 order-4 lg:order-2 row-span-2 mb-10 bg-white overflow-auto border border-indigo-500/50 rounded-md"
                    style={{
                        animationDelay: "0.3s",
                    }}
                >
                    {/* <p>getPrestashop: {JSON.stringify(getPrestashop(indexProduct))}</p> */}

                    <p className="font-bold min-h-5 bg-sky-500 text-gray-900 p-3">
                        {productName &&
                            JSON.stringify(productName).replaceAll('"', "")}
                    </p>

                    <p>
                        {/* Category Image */}
                        {product && (
                            <div
                            // to={
                            //     `https://shop.pharmacie-en-couleurs-eragny.com/?controller=product&id_product=` +
                            //     product.id
                            // }
                            // target="_blank"
                            // rel="noopener noreferrer"
                            >
                                <div className="relative">
                                    {
                                        <img
                                            class="max-h-18 object-cover"
                                            src={`https://shop.pharmacie-en-couleurs-eragny.com/${product.associations.images[0].id}-medium_default/${product.link_rewrite}.jpg`}
                                        />
                                    }
                                    {/* {
                                        <div className="my-custom-class">
                                            <TButton
                                                color="green"
                                                className="max-w-[120px] "
                                            >
                                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                                            </TButton>
                                        </div>
                                    } */}

                                    {/* {<>Description: {product.description_short}</>} */}
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: product.description_short.replace(
                                                regex,
                                                ""
                                            ),
                                        }}
                                        className="overflow-hidden flex-1"
                                    ></div>
                                    {/* <br />
                            <p>
                                URL ={" "}
                                {`https://shop.pharmacie-en-couleurs-eragny.com/?controller=product&id_product=` +
                                    product.id}
                            </p> */}
                                </div>
                            </div>
                        )}
                        {/* End Category Image */}
                    </p>
                    {/* <p style={{ marginBottom: "15px" }}>IndexProduct: {indexProduct}</p> */}
                </DashboardCard>
            )}
        </>
    );
}
