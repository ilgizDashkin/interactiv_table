//поиск даты
function searchDate(str) {
    let resultDate = str.match(/([0-2]\d|3[01])\.(0\d|1[012])\.(\d{4})/gi) //поиск замера из текста пробел м
    if (resultDate === null) {
        resultDate = str.match(/((\d{1,2} января)|(\d{1,2} февраля)|(\d{1,2} марта)|(\d{1,2} апреля)|(\d{1,2} мая)|(\d{1,2} июня)|(\d{1,2} июля)|(\d{1,2} августа)|(\d{1,2} сентября)|(\d{1,2} октября)|(\d{1,2} ноября)|(\d{1,2} декабря)) (\d{4})/gi)

        let kStr = str.match(/(\d{1,2} января) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" января ", ".01.")
            //console.log(kStr);
            resultDate[0] = k
        }

        kStr = str.match(/(\d{1,2} февраля) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" февраля ", ".02.")
            //console.log(kStr);
            resultDate[0] = k
        }
        kStr = str.match(/(\d{1,2} марта) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" марта ", ".03.")
            //console.log(kStr);
            resultDate[0] = k
        }
        kStr = str.match(/(\d{1,2} апреля) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" апреля ", ".04.")
            //console.log(kStr);
            resultDate[0] = k
        }
        kStr = str.match(/(\d{1,2} мая) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" мая ", ".05.")
            //console.log(kStr);
            resultDate[0] = k
        }
        kStr = str.match(/(\d{1,2} июня) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" июня ", ".06.")
            //console.log(kStr);
            resultDate[0] = k
        }
        kStr = str.match(/(\d{1,2} июля) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" июля ", ".07.")
            //console.log(kStr);
            resultDate[0] = k
        }
        kStr = str.match(/(\d{1,2} августа) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" августа ", ".08.")
            //console.log(kStr);
            resultDate[0] = k
        }
        kStr = str.match(/(\d{1,2} сентября) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" сентября ", ".09.")
            //console.log(kStr);
            resultDate[0] = k
        }
        kStr = str.match(/(\d{1,2} октября) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" октября ", ".10.")
            //console.log(kStr);
            resultDate[0] = k
        }
        kStr = str.match(/(\d{1,2} ноября) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" ноября ", ".11.")
            //console.log(kStr);
            resultDate[0] = k
        }
        kStr = str.match(/(\d{1,2} декабря) (\d{4})/gi)
        if (kStr !== null) {
            // resultDate = kStr
            let k = kStr[0].replace(" декабря ", ".12.")
            //console.log(kStr);
            resultDate[0] = k
        }

    }
    return resultDate
}
//поиск всей длинны
function all_lenght(str) {
    let result = []
    result = str.match(/вся длинна: \d+м/gi) //поиск длинны
    if (result !== null) {
        result[0] = result[0].replace(/[^-0-9]/gim, ''); //удаление лишних символов длинны
        console.log("вся длина " + result[0]);
        return result[0]
    }
}
//поиск средней длины 
function average_lenght(arr) {
    let lenght_massiv = []
    let average = 0
    for (let element of arr) {
        let str1 = element.priv
        let all_lenght1 = all_lenght(str1)
        // console.log("all_lenght1"+all_lenght1)
        if (all_lenght1 !== undefined) {
            lenght_massiv.push(Number(all_lenght1))
        }
    }
    if (lenght_massiv.length !== 0) {
        console.log("массив длин  " + lenght_massiv);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        let sum = lenght_massiv.reduce(reducer)
        average = Math.round(sum / lenght_massiv.length)
        console.log("ср длин  " + average);
    }
    return average
}
// сортировка по замеру
function searchZamer(arr) {
    let massiv = [];
    for (let i = 0; i < arr.length; i++) {
        let elem1 = arr[i][1]
        let elem2 = arr[i][2]
        // console.log(elem1);
        // console.log(elem2);
        let str = elem2;
        let result = str.match(/ \d+ м от /gi) //поиск замера из текста пробел м
        if (result === null) {
            result = str.match(/ \d+м от /gi) //поиск замера из текста без пробел м
        }
        if (result === null) {
            result = str.match(/ \d+м. от /gi) //поиск замера из текста без пробел м
        }
        if (result === null) {
            result = str.match(/ \d+ м. от /gi) //поиск замера из текста без пробел м
        }
        if (result !== null) {
            result[0] = result[0].replace(/[^-0-9]/gim, ''); //удаление лишних символов из замера
        } else {
            result = []
            result[0] = 0
        }
        // console.log(result[0]);
        let resultDate1 = searchDate(str)
        //конец поиск даты
        // console.log(resultDate1[0]);
        //начало преобразовать дату в милисекунды с 1970г
        let dateRazbor = []
        dateRazbor = resultDate1[0].split('.')
        // console.log(dateRazbor)
        let msUTC
        msUTC = Date.parse(dateRazbor[2] + "-" + dateRazbor[1] + "-" + dateRazbor[0])
        // console.log(msUTC)
        //конец преобразовать дату в милисекунды
        let povr = {};
        povr.id = arr[i][0]
        povr.name = elem1;
        povr.priv = elem2;
        povr.zamer = Number(result[0]);
        povr.date = resultDate1[0];
        povr.dateSec = msUTC;
        massiv.push(povr);

    }
    massiv.sort(function (a, b) { //сортировка масива по наименьшему
        return a.zamer - b.zamer
    })
    console.log(massiv);
    return massiv
    // let massivDateSort = [];
    // massivDateSort = massiv.slice().sort(function(a, b) { //сортировка масива по наименьшему чтоб не изменять исходный массив надо slice 
    //     return a.dateSec - b.dateSec
    // })


    // var mass2 = dateGraf(massivDateSort)
    // console.log(mass2)
    // // console.log(massivDateSort);
    // graf1(mass2);
}

export { searchZamer, average_lenght }