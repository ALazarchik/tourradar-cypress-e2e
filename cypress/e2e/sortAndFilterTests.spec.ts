import { sortAndFilterBlock } from "../support/pageObjects/SortAndFilterBlock";
import { toursListBlock } from "../support/pageObjects/ToursListBlock";

import * as Chance from "chance";
const chance = new Chance();

describe("Sort & filter tests", () => {
    beforeEach("open application", () => {
        cy.openHomePage();
    });

    it("[TR-SORT-1] should sort tours by reviews", () => {
        sortAndFilterBlock.sortToursByReviews();
        toursListBlock.checkToursSortedByReviews();
    });

    it("[TR-FILTER-1] should filter tours by length", () => {
        const minTourLength = chance.integer({ min: 1, max: 10 });
        const maxTourLength = chance.integer({ min: 11, max: 21 });

        sortAndFilterBlock.applyTourLengthFilter(minTourLength, maxTourLength);
        toursListBlock.checkToursInListWithinLengthRange(minTourLength, maxTourLength);
    });

    it("[TR-FILTER-2] should filter tours by Operated in language", () => {
        const language = chance.pickone(["English", "German", "Spanish", "French", "Italian"]);

        sortAndFilterBlock.applyOperatedInFilter(language);
        toursListBlock.checkToursInListOperatedIn(language);
    });
});
