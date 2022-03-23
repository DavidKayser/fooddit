import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import redditsReducer, { loadReddits } from "./redditsSlice";

describe("<Reddits />", () => {
    it("should return the initial state", () => {
        expect(redditsReducer(undefined, {})).toEqual(
            {
                reddits: []
            }
        )
    });

    it("should handle reddits being loaded to an empty object", () => {
        const previousState = {};
        expect (redditsReducer(previousState, loadReddits({

        }))).toEqual({

        })
    });



    

  });