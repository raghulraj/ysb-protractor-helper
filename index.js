const EC = protractor.ExpectedConditions;
const DEFAULT_TIMEOUT_IN_MS = 5000;
const ELEMENT_WITH_LOCATOR_MESSAGE = "element with locator";
const IS_NOT_CLICKABLE_MESSAGE = "is not clickable";
const IS_NOT_PRESENT_MESSAGE = "is not present";
const IS_NOT_TAPPABLE_MESSAGE = "is not tappable";
const IS_NOT_VISIBLE_MESSAGE = "is not visible";
const IS_STILL_PRESENT_MESSAGE = "is still present";
const IS_STILL_VISIBLE_MESSAGE = "is still visible";
const POSSIBLE_IT_IS_NOT_PRESENT_OR_VISIBLE_MESSAGE = "Possibly it's not present or visible.";

async function getDefaultIsNotPresentMessage(htmlElement) {
    return `${ELEMENT_WITH_LOCATOR_MESSAGE} '${
    htmlElement.parentElementArrayFinder.locator_.value
  }' ${IS_NOT_PRESENT_MESSAGE}`;
}
async function getDefaultIsNotVisibleMessage(htmlElement) {
    return `${ELEMENT_WITH_LOCATOR_MESSAGE} '${
     htmlElement.parentElementArrayFinder.locator_.value
  }' ${IS_NOT_VISIBLE_MESSAGE}`;
}

async function getDefaultIsNotClickableMessage(htmlElement) {
    return `${ELEMENT_WITH_LOCATOR_MESSAGE} '${
    htmlElement.parentElementArrayFinder.locator_.value
  }' ${IS_NOT_CLICKABLE_MESSAGE}. ${POSSIBLE_IT_IS_NOT_PRESENT_OR_VISIBLE_MESSAGE}`;
}
async function waitForElementToBeClickable(htmlElement, message = getDefaultIsNotClickableMessage(htmlElement), timeout = DEFAULT_TIMEOUT_IN_MS) {
    try {
        await browser.wait(EC.elementToBeClickable(htmlElement), timeout, message);
        await console.log("Waiting for " + htmlElement.parentElementArrayFinder.locator_.value);
    } catch (e) {
        await console.log("Error:" + e);
    }
}
async function requiredParam(functionWithoutParam, requiredParameter = "htmlElement") {
    const requiredParamError = new Error(`Parameter '${requiredParameter}' is missing at function '${
      functionWithoutParam.name
    }()'. \nFill the required parameter.`);
    Error.captureStackTrace(requiredParamError, functionWithoutParam);
    throw requiredParamError;
}

const openNewBrowser = async function(browser = requiredParam(openNewBrowser, "browser")) {
    return browser.forkNewDriverInstance(true);
};

const waitForElementPresence = async function(htmlElement = requiredParam(waitForElementPresence), message = getDefaultIsNotPresentMessage(htmlElement), timeout = DEFAULT_TIMEOUT_IN_MS) {
    await browser.wait(EC.presenceOf(htmlElement), timeout, message);
};
const waitForElementNotToBePresent = async function(htmlElement = requiredParam(waitForElementNotToBePresent), message = `${ELEMENT_WITH_LOCATOR_MESSAGE} '${
    htmlElement.parentElementArrayFinder.locator_.value
  }' ${IS_STILL_PRESENT_MESSAGE}`, timeout = DEFAULT_TIMEOUT_IN_MS) {
    browser.wait(EC.stalenessOf(htmlElement), timeout, message);
};
const waitForElementVisibility = async function(htmlElement = requiredParam(waitForElementVisibility), message = getDefaultIsNotVisibleMessage(htmlElement), timeout = DEFAULT_TIMEOUT_IN_MS) {
    await browser.wait(EC.visibilityOf(htmlElement), timeout, message);
};
const waitForElementNotToBeVisible = async function(htmlElement = requiredParam(waitForElementNotToBeVisible), message = `${ELEMENT_WITH_LOCATOR_MESSAGE} '${
    htmlElement.parentElementArrayFinder.locator_.value
  }' ${IS_STILL_VISIBLE_MESSAGE}`, timeout = DEFAULT_TIMEOUT_IN_MS) {
    browser.wait(EC.invisibilityOf(htmlElement), timeout, message);
};
const click = async function(htmlElement = requiredParam(click), message = getDefaultIsNotClickableMessage(htmlElement), timeout = DEFAULT_TIMEOUT_IN_MS) {
    await waitForElementToBeClickable(htmlElement, message, timeout);
    await htmlElement.click();
    await console.log("Clicked on: " + htmlElement.parentElementArrayFinder.locator_.value);
};
const fillField = async function(htmlElement = requiredParam(fillField), text = requiredParam(fillField, "text"), message = getDefaultIsNotVisibleMessage(htmlElement), timeout = DEFAULT_TIMEOUT_IN_MS) {
    await this.waitForElementVisibility(htmlElement, message, timeout);
    await htmlElement.sendKeys(text);
};
const fillInputFieldWithFile = async function(htmlElement = requiredParam(fillInputFieldWithFile), text = requiredParam(fillInputFieldWithFile, "text"), message = getDefaultIsNotPresentMessage(htmlElement), timeout = DEFAULT_TIMEOUT_IN_MS) {
    await this.waitForElementPresence(htmlElement, message, timeout);
    await htmlElement.sendKeys(text);
};
const clearField = async function(htmlElement = requiredParam(clearField), message = getDefaultIsNotVisibleMessage(htmlElement), timeout = DEFAULT_TIMEOUT_IN_MS) {
    await this.waitForElementVisibility(htmlElement, message, timeout);
    await htmlElement.clear();
};
const clearandFillField = async function(htmlElement = requiredParam(clearandFillField), text = requiredParam(clearandFillField, "text"), message = getDefaultIsNotVisibleMessage(htmlElement), timeout = DEFAULT_TIMEOUT_IN_MS) {
    await this.waitForElementVisibility(htmlElement, message, timeout);
    await htmlElement.clear();
    await htmlElement.sendKeys(text);
};
const tap = async function(htmlElement = requiredParam(tap), message = `${ELEMENT_WITH_LOCATOR_MESSAGE} '${
    htmlElement.parentElementArrayFinder.locator_.value
  }' ${IS_NOT_TAPPABLE_MESSAGE}. ${POSSIBLE_IT_IS_NOT_PRESENT_OR_VISIBLE_MESSAGE}`, timeout = DEFAULT_TIMEOUT_IN_MS) {
    await waitForElementToBeClickable(htmlElement, message, timeout);
    await browser.touchActions().tap(htmlElement).perform();
};
const waitForText = async function(htmlElement = requiredParam(waitForText), text = requiredParam(waitForText, "text"), message = `text '${text}' not present on ${ELEMENT_WITH_LOCATOR_MESSAGE} '${
    htmlElement.parentElementArrayFinder.locator_.value
  }'`, timeout = DEFAULT_TIMEOUT_IN_MS) {
    await browser.wait(EC.textToBePresentInElement(htmlElement, text), timeout, message);
};
const waitForNoText = async function(htmlElement = requiredParam(waitForNoText), text = requiredParam(waitForNoText, "text"), message = `text '${text}' is still present on ${ELEMENT_WITH_LOCATOR_MESSAGE} '${
    htmlElement.parentElementArrayFinder.locator_.value
  }'`, timeout = DEFAULT_TIMEOUT_IN_MS) {
    await browser.wait(EC.not(EC.textToBePresentInElement(htmlElement, text)), timeout, message);
};
const waitForUrlToBeEqualToExpectedUrl = async function(expectedUrl = requiredParam(waitForUrlToBeEqualToExpectedUrl, "expectedUrl"), message = `current URL is different of '${expectedUrl}'`, timeout = DEFAULT_TIMEOUT_IN_MS) {
    await browser.wait(EC.urlIs(expectedUrl), timeout, message);
};
const waitForUrlNotToBeEqualToExpectedUrl = async function(expectedUrl = requiredParam(waitForUrlNotToBeEqualToExpectedUrl, "expectedUrl"), message = `current URL is equal to '${expectedUrl}'`, timeout = DEFAULT_TIMEOUT_IN_MS) {
    await browser.wait(EC.not(EC.urlIs(expectedUrl)), timeout, message);
};
const waitForUrlToContainString = async function(string = requiredParam(waitForUrlToContainString, "string"), message = `current URL does not contains the string '${string}'`, timeout = DEFAULT_TIMEOUT_IN_MS) {
    await browser.wait(EC.urlContains(string), timeout, message);
};
const waitForUrlNotToContainString = async function(string = requiredParam(waitForUrlNotToContainString, "string"), message = `current URL contains the string '${string}'`, timeout = DEFAULT_TIMEOUT_IN_MS) {
    await browser.wait(EC.not(EC.urlContains(string)), timeout, message);
};
const fillFieldAndPressEnter = async function(htmlElement = requiredParam(fillFieldAndPressEnter), text = requiredParam(fillFieldAndPressEnter, "text"), message = getDefaultIsNotVisibleMessage(htmlElement), timeout = DEFAULT_TIMEOUT_IN_MS) {
    await this.fillField(htmlElement, text, message, timeout);
    await this.fillField(htmlElement, protractor.Key.ENTER, message, timeout);
};
const scrollToElement = async function(htmlElement = requiredParam(scrollToElement), message = getDefaultIsNotVisibleMessage(htmlElement), timeout = DEFAULT_TIMEOUT_IN_MS) {
    await this.waitForElementVisibility(htmlElement, message, timeout);
    await browser.executeScript("arguments[0].scrollIntoView(true);", htmlElement);
};
module.exports = {
    openNewBrowser,
    waitForElementPresence,
    waitForElementNotToBePresent,
    waitForElementVisibility,
    waitForElementNotToBeVisible,
    click,
    fillField,
    fillInputFieldWithFile,
    clearField,
    clearandFillField,
    tap,
    waitForText,
    waitForNoText,
    waitForUrlToBeEqualToExpectedUrl,
    waitForUrlNotToBeEqualToExpectedUrl,
    waitForUrlToContainString,
    waitForUrlNotToContainString,
    fillFieldAndPressEnter,
    scrollToElement
};
