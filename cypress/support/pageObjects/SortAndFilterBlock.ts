class SortAndFilterBlock {
    private filtersCard: string;
    private minTourLengthSliderPoint: string;
    private maxTourLengthSliderPoint: string;
    private operatedInDropdown: string;
    private languageCheckboxes: string;
    private clearAllButton: string;
    private sortToursDropdown: string;

    constructor() {
        this.filtersCard = "[data-cy='serp-filters--filter-card']";
        this.minTourLengthSliderPoint = "[data-cy='serp-filters--duration-lower-sliderpoint']";
        this.maxTourLengthSliderPoint = "[data-cy='serp-filters--duration-upper-sliderpoint']";
        this.operatedInDropdown = "[data-cy='serp-filters--operated-in']";
        this.languageCheckboxes = ".ao-serp-filters-guide-language__item.ao-serp-filters-checkbox";
        this.clearAllButton = "[data-cy='serp-filters--clear-all']";
        this.sortToursDropdown = "[data-cy='serp-filters--sort']";
    }

    setMinTourLength(numOfDaysToIncrease: number) {
        if(numOfDaysToIncrease) {
            const rightArrowButtonClicks = "{rightarrow}".repeat(numOfDaysToIncrease);
            cy.get(this.minTourLengthSliderPoint)
                .click({ multiple: true, force: true })
                .type(rightArrowButtonClicks);
        }
        const newValue = `${1 + numOfDaysToIncrease}.0`;
        cy.get(this.minTourLengthSliderPoint).should("have.attr", "aria-valuenow", newValue);
    }

    setMaxTourLength(numOfDaysToDecrease: number) {
        if(numOfDaysToDecrease) {
            const leftArrowButtonClicks = "{leftarrow}".repeat(numOfDaysToDecrease);
            cy.get(this.maxTourLengthSliderPoint)
                .click({ multiple: true, force: true })
                .type(leftArrowButtonClicks);
        }
        const newValue = `${21 - numOfDaysToDecrease}.0`;
        cy.get(this.maxTourLengthSliderPoint).should("have.attr", "aria-valuenow", newValue);
    }

    checkSortAndFilterCardIsUpdated(filterMessage: string) {
        cy.get(this.filtersCard).find("h6").should("have.text", "1 filter applied");
        cy.get(this.filtersCard).find(".js-serp-parameters__filters").should("have.text", filterMessage);
        cy.get(this.clearAllButton).should("be.visible");
    }

    applyTourLengthFilter(minTourLength: number, maxTourLength: number) {
        const tourLengthFilterMessage =
            `Duration is ${minTourLength} - ${maxTourLength}${maxTourLength === 21 ? "+" : ""} days`;
        this.setMinTourLength(minTourLength - 1);
        this.setMaxTourLength(21 - maxTourLength);
        this.checkSortAndFilterCardIsUpdated(tourLengthFilterMessage);
    }

    applyOperatedInFilter(language: string) {
        const mustSeeCountryFilterMessage = `Operated in ${language}`;
        cy.get(this.operatedInDropdown).click();
        cy.get(this.languageCheckboxes).contains(language).click();
        this.checkSortAndFilterCardIsUpdated(mustSeeCountryFilterMessage);
    }

    sortToursByReviews() {
        cy.get(this.sortToursDropdown).should("contain.text", "Popularity: Most popular first");
        cy.get(this.sortToursDropdown).select("Reviews: Most reviewed");
        cy.get(this.sortToursDropdown).should("contain.text", "Reviews: Most reviewed");
    }
}

export const sortAndFilterBlock = new SortAndFilterBlock();
