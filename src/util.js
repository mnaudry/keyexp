export default class Util {
    static getState(stateValue ,state , color = false ) {
        return (color)?stateValue[state].color :stateValue[state].textState;
      }

    static getPriority(priorityValue , priority, date, color = false) {

        const now = new Date().getTime() ;
        const nbDaySt = date - now ;
        const aDay = 1000*60*60*24;
        const  days = Math.round((Math.abs(nbDaySt)/aDay));
       if(priority === 4)
          return (color)? priorityValue[priority].color :priorityValue[priority].textPriority ; 
       else 
         return (color)?priorityValue[priority].color :priorityValue[priority].textPriority + ` ${days} jour(s)`;

   }

}