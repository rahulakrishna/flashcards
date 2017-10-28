/**
 * Created by rahul on 26/10/17.
 */
import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native'
import {getDeck} from '../utils/helpers'

class Quiz extends React.Component{
    static navigationOptions=({navigation})=>({
        title:`Attempt ${navigation.state.params.card} Quiz`
    })
    constructor(props){
        super(props)
        this.state={
            details:[{questions:[]}],
            currentQuestion:1,
            showAnswer:false,
            correct:0,
            showFinish:false
        }
    }
    componentDidMount(){
        console.log(this.props)
        this.setState({
            details:getDeck(this.props.navigation.state.params.card)
        })
    }
    render(){
        const {currentQuestion,details} = this.state
        console.log(details[0].questions)
        return(
            <View style={styles.container}>
                <Text>
                    {currentQuestion + '/' + details[0].questions.length}
                </Text>
                <Text style={styles.question}>
                    {(details[0].questions.length>0)&&
                        details[0].questions[currentQuestion-1].question
                    }
                </Text>
                {(this.state.showAnswer)?
                    <TouchableOpacity
                        onPress={()=>{this.setState({showAnswer:false})}}
                    >
                        <Text>Question</Text>
                    </TouchableOpacity>:
                    <TouchableOpacity
                        onPress={()=>{this.setState({showAnswer:true})}}
                    >
                        <Text>Answer</Text>
                    </TouchableOpacity>
                }
                <Text style={{padding:20}}>
                    {this.state.showAnswer&&
                        details[0].questions[currentQuestion-1].answer
                    }
                </Text>
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'green'}]}
                    onPress={()=>{
                        if(details[0].questions.length>currentQuestion){
                            this.setState({
                                correct:this.state.correct+1,
                                currentQuestion:this.state.currentQuestion+1
                            })
                        }
                        else{
                            this.setState({
                                correct:this.state.correct+1,
                                showFinish:true
                            })
                        }
                    }}
                >
                    <Text>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button,{backgroundColor:'red'}]}
                    onPress={()=>{
                        if(details[0].questions.length>currentQuestion){
                            this.setState({
                                currentQuestion:this.state.currentQuestion+1
                            })
                        }
                        else{
                            this.setState({
                                showFinish:true
                            })
                        }
                    }}
                >
                    <Text>No</Text>
                </TouchableOpacity>
                {(details[0].questions.length>currentQuestion)&&
                    <TouchableOpacity
                        onPress={()=>{this.setState({currentQuestion:this.state.currentQuestion+1})}}
                    >
                        <Text>Next</Text>
                    </TouchableOpacity>
                }

                {(this.state.showFinish)&&
                    <TouchableOpacity><Text>Finish</Text></TouchableOpacity>
                }
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center'
    },
    question:{
        fontSize:24,
        padding:20,
        textAlign:'center'
    },
    button:{
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
    }
})

export default Quiz