import { useState } from 'react'
import axios from 'axios';

function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState("");

  //********** Using "Query" to pass Data to Backend ****************** */

  const handleSubstraction = () => {

    axios.get(`http://localhost:8001/substraction?num1=${num1}&num2=${num2}`).then(res => {
      console.log(res);

      setResult(res.data);
    })
  }


  //********** using "Params" to pass Data to Backend ************* */

  const handleAddition = () => {

    //using Here "GET" API Call because Not sending data in form of "body" so no need to use "POST" but I can also use "POST" also but need to change the Same in Backend code also

    axios.get(`http://localhost:8001/addition/${num1}/${num2}`).then((res) => {
      console.log(res.data)
      setResult(res.data);
    });
  }



  //********** using "body" here to Send data to Backend ************ */
  const handleAdd = () => {

    axios.post("http://localhost:8001/add", {
      num1: parseInt(num1),
      num2: parseInt(num2),
    }).then((res) => {
      console.log(res.data)
      setResult(res.data);
    });
  }

  const handleSub = () => {
    axios.post(`http://localhost:8001/sub`, {
      num1: parseInt(num1),
      num2: parseInt(num2)
    }).then(res => {
      console.log(res)
      setResult(res.data)
    });
  }

  const handleMul = () => {
    axios.post(`http://localhost:8001/multiply`, {
      num1: parseInt(num1),
      num2: parseInt(num2)
    }).then(res => {
      console.log(res)
      setResult(res.data)
    });
  }
  const handleDiv = () => {
    axios.post(`http://localhost:8001/divide`, {
      num1: parseInt(num1),
      num2: parseInt(num2)
    }).then(res => {
      console.log(res)
      setResult(res.data)
    }).catch(err => {
      console.log(err);

      setResult(err.response.data)
    });
  }

  return (
    <>
      <input type="number" value={num1} name="Num1" onChange={e => setNum1(e.target.value)} />
      <input type="number" value={num2} name="Num2" onChange={e => setNum2(e.target.value)} />

      <p>Using body Here to Send Data to Backend</p>
      <button onClick={handleAdd} >Addition</button>
      <button onClick={handleSub} >Substract</button>
      <button onClick={handleMul} >Multiply</button>
      <button onClick={handleDiv} >Divide</button>

      <p>Using Params here to Send Data to Backend</p>
      <button onClick={handleAddition}>Addition Using Params</button>

      <p>Using Query here to Send Data to Backend</p>
      <button onClick={handleSubstraction}>Substraction Using Query</button>


      <p>{result}</p>
    </>
  )
}

export default App
