import jMoment from 'moment-jalaali'

export const convertDateToJalali =(date)=>{
    return jMoment(date).format('jYYYY/jMM/jDD')
}