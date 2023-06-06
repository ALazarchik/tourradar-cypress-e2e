class ToursListBlock {
    private tourCards: string;
    private toursList: string;

    constructor() {
        this.toursList = "[data-cy='serp-tours--list']";
        this.tourCards = "[data-cy='serp-tour']";
    }

    checkToursInListWithinLengthRange(minLength: number, maxlength: number) {
        cy.wait(["@loadTours", "@savings", "@omnimove"]).wait(2000);
        cy.get(`${this.tourCards} .br__price-wrapper-info dd`).each((tourInfo, index) => {
            if (index % 2 === 0) {
                const tourLength = Number(tourInfo.text().replaceAll(" days", ""));
                cy.wrap(tourLength).should("be.within", minLength, maxlength);
            }
        });
    }

    checkToursInListOperatedIn(language: string) {
        cy.wait("@loadTours").wait(500);
        cy.get(`${this.tourCards} .values dt`).filter(':contains(Operated in)').each((tourInfo) => {
            cy.wrap(tourInfo).next("dd").should("contain.text", language);
        });
    }

    checkToursSortedByReviews() {
        cy.wait("@loadTours").wait(500);
        let previousNumberOfReviews: number;
        cy.get(`${this.tourCards} .rev span`).each((rating, index) => {
            const numberOfReviews = Number(rating.text().replace(" reviews", "").replace(",", ""));
            if (index === 0) {
                previousNumberOfReviews = numberOfReviews;
            } else {
                cy.wrap(numberOfReviews).should("be.lessThan", previousNumberOfReviews);
                previousNumberOfReviews = numberOfReviews;
            }
        });
    }
}

export const toursListBlock = new ToursListBlock();
