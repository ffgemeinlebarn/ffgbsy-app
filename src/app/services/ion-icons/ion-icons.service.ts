import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { radioButtonOn, homeOutline, speedometerOutline, addOutline, arrowForwardOutline, returnDownForwardOutline, albumsOutline, alertCircle, alertCircleOutline, arrowBack, arrowForward, arrowUndo, beerOutline, bookmarkOutline, bugOutline, checkmarkCircle, checkmarkCircleOutline, closeCircle, closeOutline, createOutline, cubeOutline, fileTrayOutline, gitPullRequest, layersOutline, logOutOutline, navigateCircleOutline, notificationsOutline, peopleOutline, personOutline, phonePortraitOutline, pintOutline, printOutline, pulseOutline, radioButtonOff, refreshOutline, restaurantOutline, rocketOutline, save, searchOutline, send, sendOutline, settingsOutline, shieldCheckmarkOutline, star, statsChartOutline, tabletLandscapeOutline, timerOutline, trash } from 'ionicons/icons';

@Injectable({
    providedIn: 'root'
})
export class IonIconsService {

    public useDefinedIcons = () => addIcons({
        homeOutline,
        speedometerOutline,
        addOutline,
        arrowForwardOutline,
        returnDownForwardOutline,
        alertCircle,
        alertCircleOutline,
        arrowUndo,
        beerOutline,
        bookmarkOutline,
        bugOutline,
        checkmarkCircle,
        closeCircle,
        closeOutline,
        createOutline,
        cubeOutline,
        fileTrayOutline,
        gitPullRequest,
        logOutOutline,
        navigateCircleOutline,
        notificationsOutline,
        peopleOutline,
        personOutline,
        phonePortraitOutline,
        pulseOutline,
        radioButtonOff,
        refreshOutline,
        restaurantOutline,
        rocketOutline,
        save,
        searchOutline,
        send,
        sendOutline,
        settingsOutline,
        shieldCheckmarkOutline,
        star,
        statsChartOutline,
        timerOutline,
        arrowBack,
        arrowForward,
        trash,
        checkmarkCircleOutline,
        albumsOutline,
        tabletLandscapeOutline,
        pintOutline,
        layersOutline,
        printOutline,
        radioButtonOn
    });
}
