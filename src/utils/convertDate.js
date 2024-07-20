import jMoment from 'moment-jalaali'

export const convertDateToJalali =(date, format='jYYYY/jMM/jDD')=>{
    return jMoment(date).format(format)
}

export const convertFormDateToMiladi = (date)=>{
    // const persinaDate = date.replace(/\s/g, '');
    // const truePersianDate = jMoment(persinaDate, 'D/M/YYYY').format('YYYY/MM/DD')
    return jMoment(date, 'jD / jM / jYYYY').format('YYYY-M-D')
}