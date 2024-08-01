import jMoment from 'moment-jalaali'

export const convertDateToJalali =(date, format='jYYYY/jMM/jDD')=>{
    return jMoment(date).format(format)
}

export const convertFormDateToMiladi = (date)=>{
    return jMoment(date, 'jD / jM / jYYYY').format('YYYY-M-D')
}
export const convertDateToMiladi = (date)=>{
    return jMoment(date).format('YYYY-MM-DD')
}