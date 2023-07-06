import streamlit.components.v1 as components 
import streamlit as st

_my_component = components.declare_component(
    "my_component",
    url="http://localhost:3001"
)
st.set_page_config(layout="wide")
return_value = _my_component(name='Hai', greeting='ahihi', key=1)
st.write("ahihi")
if (return_value):
    st.write("Number of clicks: ", return_value[0]['$d'])
    st.write("Number of clicks: ", return_value[1]['$d'])

