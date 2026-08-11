"""Tests for the AI simulator."""

import pytest
from simulator import get_response, RESPONSES, DEFAULT_RESPONSES


def test_known_keyword_hola():
    response = get_response("hola")
    assert response in RESPONSES["hola"]


def test_known_keyword_hello():
    response = get_response("Hello!")
    assert response in RESPONSES["hello"]


def test_known_keyword_case_insensitive():
    response = get_response("HOLA")
    assert response in RESPONSES["hola"]


def test_known_keyword_partial_match():
    response = get_response("dime un chiste por favor")
    assert response in RESPONSES["chiste"]


def test_exit_keywords_not_matched_as_responses():
    # 'salir'/'exit' are handled in run_chat, not get_response
    # get_response should return a default for them
    response = get_response("salir")
    assert isinstance(response, str) and len(response) > 0


def test_unknown_input_returns_default():
    response = get_response("xkzqwerty12345")
    assert response in DEFAULT_RESPONSES


def test_no_false_partial_match():
    # "bye" should NOT match inside "maybe"
    response = get_response("maybe")
    assert response in DEFAULT_RESPONSES


def test_all_keywords_return_valid_response():
    for keyword in RESPONSES:
        response = get_response(keyword)
        assert response in RESPONSES[keyword]


def test_response_is_string():
    for text in ["hola", "ayuda", "chiste", "random text"]:
        assert isinstance(get_response(text), str)
