import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios";
import axios from "axios";
import PublicQuestionView from "../components/PublicQuestionView";

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

    console.log(indexProduct);

    async function getPrestashop(x) {
        //  const response = await axios.post(
        //   "https://MY_ENDPOINT.execute-api.us-east-1.amazonaws.com/v1/",
        //   API_GATEWAY_POST_PAYLOAD_TEMPLATE,
        //   { headers }
        // );
        // const data = await response.json();

        try {
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
                    if (
                        res != []

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
                        console.log(x + " --- " + res.data.products[0].name);
                        setProductName(res.data.products[0].name);
                        setProduct(res.data.products[0]);

                        // console.log(typeof res.data.products[0].name);
                        // return res.data.products[0].name;
                        // return "res.data.products[0].name";
                        // }
                    }
                    // console.log("empty");
                });
        } catch (error) {
            return;
            console.log(error);
        }
    }

    // console.log(indexProduct);

    return (
        <div>
            {/* <p>getPrestashop: {JSON.stringify(getPrestashop(indexProduct))}</p> */}
            <p>___</p>
            <p style={{ backgroundColor: "red" }}>
                Name: {productName && JSON.stringify(productName)}
            </p>

            <p>
                {/* Category Image */}
                {product && (
                    <div>
                        {
                            <img
                                class="w-28 h-28 object-cover"
                                src={`https://shop.pharmacie-en-couleurs-eragny.com/${product.associations.images[0].id}-medium_default/${product.link_rewrite}.jpg`}
                            />
                        }{" "}
                        {<>Description: {product.description_short}</>}
                        <br />
                        <p>{product.link_rewrite}</p>
                    </div>
                )}
                {/* End Category Image */}
            </p>
            <p style={{ marginBottom: "15px" }}>IndexProduct: {indexProduct}</p>
        </div>
    );
}
