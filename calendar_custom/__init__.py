import streamlit.components.v1 as components 
import streamlit as st
import os 


_RELEASE = True 

parent_dir = os.path.dirname(os.path.abspath(__file__))
build_dir = os.path.join(parent_dir, "frontend/build")

if(_RELEASE):
    _my_component = components.declare_component(
    "calendar_custom",
    path = build_dir 
    )
else:
    _my_component = components.declare_component(
    "calendar_custom",
    url="http://localhost:3001"
    )


st.set_page_config(layout="wide")
return_value = _my_component(name='Hai', greeting='ahihi', key=1)
st.write("ahihi")
if (return_value):
    st.write("Number of clicks: ", return_value[0]['$d'])
    st.write("Number of clicks: ", return_value[1]['$d'])

