import React from "react"
import { ActivityIndicator, View } from "react-native"

const CommonLoader =()=>{
    return(
        <>
         <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:"#000"}}>
                <ActivityIndicator size="large" color="#ff922b" />
              </View>
        </>
        
    )

}
export default CommonLoader;