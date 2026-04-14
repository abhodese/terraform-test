from typing import TypedDict
from langgraph.graph import StateGraph, END
from langchain_groq import ChatGroq


class GraphState(TypedDict):
    message: str
    answer: str


llm = ChatGroq(model="llama-3.1-70b-versatile")


def run_llm(state: GraphState) -> GraphState:
    response = llm.invoke(
        f"You are Abhishek's technical portfolio assistant. Answer clearly and concisely. Question: {state['message']}"
    )
    return {**state, "answer": response.content}


def build_graph():
    graph = StateGraph(GraphState)
    graph.add_node("llm_step", run_llm)
    graph.set_entry_point("llm_step")
    graph.add_edge("llm_step", END)
    return graph.compile()
