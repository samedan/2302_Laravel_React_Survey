import axios from "axios";

export function convertObjectOfCountsIntoArray(countedMeds) {
    const res_array = [];
    for (let i in countedMeds) {
        res_array.push([i, countedMeds[i]]);
    }
    // console.log(res_array);
    // employees.sort((a, b) => b.age - a.age);
    // employees.forEach((e) => {
    //     console.log(`${e.firstName} ${e.lastName} ${e.age}`);
    // });
    res_array.sort((a, b) => b[1] - a[1]);
    // res_array.forEach((e) => {
    //     console.log(`${e[0]} ${e[1]}`);
    // });
    return res_array;
}

export function translateIntoNumbers(desc) {
    let numberedMeds;
    // console.log("desc before translate");
    // console.log(desc);
    // console.log(typeof desc);
    numberedMeds = desc.split(",");
    // let arr = desc.split(",").filter((element) => element);
    // console.log("numberedMeds");
    // console.log(numberedMeds);
    let resultsWithoutSpaces;
    resultsWithoutSpaces = numberedMeds.map((el) => {
        return el.trim();
    });
    // console.log("resultsWithoutSpaces");
    // console.log(resultsWithoutSpaces);
    resultsWithoutSpaces.map((res) => getPrestashop(res));
    // console.log("resultsWithoutSpaces After translate");
    // console.log(resultsWithoutSpaces);
    // return resultsWithoutSpaces;
}

export function countSameMedsInArray(myArray) {
    let countObject = myArray.reduce(function (count, currentValue) {
        return (
            count[currentValue]
                ? ++count[currentValue]
                : (count[currentValue] = 1),
            count
        );
    }, {});

    // console.log(countObject);
    setCountedMeds(countObject);
    // const keys = Object.keys(a);
    // const values = Object.values(a);
    const keys = Object.keys(countObject);
    // console.log(keys);
    const values = Object.values(countObject);
    // console.log(values);
    return countObject;
}

export function getPrestashop(x) {
    // console.log("x");
    // console.log(x);
    // const y = fetch(
    //     // "https://H8MU9WC4GQRDWKAFQ23WRY1HA4CQSBRD@shop.pharmacie-en-couleurs-eragny.com/api/products/&filter[reference]=[3532678600406]?display=full",
    //     `https://shop.pharmacie-en-couleurs-eragny.com/api/products/&filter[reference]=[` +
    //         x +
    //         `]?display=full&output_format=JSON`,
    //     {
    //         headers: {
    //             Authorization:
    //                 "BASIC SDhNVTlXQzRHUVJEV0tBRlEyM1dSWTFIQTRDUVNCUkQ=",
    //         },
    //     }
    // )
    //     // .then((response) => response.JSON())

    //     .then((response) => response.json())
    //     .then((data) => console.log(data.products[0].name));

    // console.log(y);

    try {
        axios
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
                    res != [] ||
                    res.data != [] ||
                    res.data.data != [] ||
                    res.data.products[0] != undefined ||
                    res.data.products != undefined
                ) {
                    // console.log(res.data.products[0]);
                    console.log(res.data.products[0].name);
                    return res.data.products[0].name;
                }
                // console.log("empty");
            });

        // console.log(getData);

        // .then((response) => {
        //     if (response.data != []) {
        //         if (response.data.products !== undefined) {
        //             console.log("response.data.products[0]");
        //             console.log(response.data.products[0].reference);
        //             console.log(response.data.products[0].name);
        //         }
        //     }
        // });
    } catch (error) {
        console.log(error);
    }
    // .then((data) => console.log(data.products[0].name));
    // .then((data) => console.log(data.products[0]));
    // .then((data) => setProduct(data.products[0]));
    // .then(
    //     console.log(
    //         `https://shop.pharmacie-en-couleurs-eragny.com/${data.products[0].images[0].id}-medium_default/${data.products[0].link_rewrite}.jpg`
    //     )
    // );

    // .then(setProduct())
    // .then((text) => console.log(text));
    // axiosClient
    //     .get(
    //         `H8MU9WC4GQRDWKAFQ23WRY1HA4CQSBRD@shop.pharmacie-en-couleurs-eragny.com/api/products/&filter[reference]=[3401547819976]?display=full`
    //     )
    //     .then(({ data }) => {
    //         setLoading(false);
    //         // setSurvey(data.data);
    //         console.log("prestashop_data");
    //         console.log(data);
    //         // setResults(data);
    //     })
    //     .catch(() => {
    //         setLoading(false);
    //     });
    // const image = document.getElementById("js-product-list").outerHTML;
    // console.log(image);

    // return <div className="App">{image}</div>;
}
