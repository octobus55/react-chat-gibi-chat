export const sortFunction = (a, b) => {
    if (a && b) {
        if (a.sendDate === b.sendDate) {
            if (a.sendHour === b.sendHour) {
                if (a.sendMinute === b.sendMinute) {
                    if (a.sendSecond === b.sendSecond) {
                        return b.sendMiliSeconds - a.sendMiliSeconds;
                    }
                    return b.sendSecond - a.sendSecond;
                }
                return b.sendMinute - a.sendMinute;
            }
            return b.sendHour - a.sendHour;
        }
        return b.sendDate - a.sendDate
    }
}