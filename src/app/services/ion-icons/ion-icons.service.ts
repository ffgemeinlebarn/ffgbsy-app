import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { addCircleOutline, addOutline, albumsOutline, alert, alertCircle, alertCircleOutline, arrowBack, arrowForward, arrowForwardOutline, arrowUndo, beerOutline, bookmarkOutline, bugOutline, checkmarkCircle, checkmarkCircleOutline, chevronForward, closeCircle, closeOutline, cloudOutline, createOutline, cubeOutline, documentTextOutline, fileTrayOutline, gitPullRequest, homeOutline, layersOutline, logOutOutline, navigateCircleOutline, notificationsOutline, peopleOutline, personOutline, phonePortraitOutline, pintOutline, printOutline, pulseOutline, radioButtonOff, radioButtonOn, refreshOutline, restaurantOutline, returnDownForwardOutline, rocketOutline, save, searchOutline, send, sendOutline, settingsOutline, shieldCheckmarkOutline, speedometerOutline, star, statsChartOutline, tabletLandscapeOutline, timerOutline, trash } from 'ionicons/icons';

@Injectable({
    providedIn: 'root'
})
export class IonIconsService {

    public useDefinedIcons = () => addIcons({
        addCircleOutline,
        addOutline,
        albumsOutline,
        alert,
        alertCircle,
        alertCircleOutline,
        arrowBack,
        arrowForward,
        arrowForwardOutline,
        arrowUndo,
        beerOutline,
        bookmarkOutline,
        bugOutline,
        checkmarkCircle,
        checkmarkCircleOutline,
        chevronForward,
        closeCircle,
        closeOutline,
        cloudOutline,
        createOutline,
        cubeOutline,
        documentTextOutline,
        fileTrayOutline,
        gitPullRequest,
        homeOutline,
        layersOutline,
        logOutOutline,
        navigateCircleOutline,
        notificationsOutline,
        peopleOutline,
        personOutline,
        phonePortraitOutline,
        pintOutline,
        printOutline,
        pulseOutline,
        radioButtonOff,
        radioButtonOn,
        refreshOutline,
        restaurantOutline,
        returnDownForwardOutline,
        rocketOutline,
        save,
        searchOutline,
        send,
        sendOutline,
        settingsOutline,
        shieldCheckmarkOutline,
        speedometerOutline,
        star,
        statsChartOutline,
        tabletLandscapeOutline,
        timerOutline,
        trash
    });
}
