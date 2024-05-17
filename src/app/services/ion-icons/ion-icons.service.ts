import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import { alertCircle, alertCircleOutline, arrowUndo, beerOutline, bookmarkOutline, bugOutline, checkmarkCircle, closeCircle, closeOutline, createOutline, cubeOutline, fileTrayOutline, gitPullRequest, logOutOutline, navigateCircleOutline, notificationsOutline, peopleOutline, personOutline, phonePortraitOutline, pulseOutline, radioButtonOff, refreshOutline, restaurantOutline, rocketOutline, save, searchOutline, send, sendOutline, settingsOutline, shieldCheckmarkOutline, star, statsChartOutline, timerOutline, arrowBack, arrowForward, trash, checkmarkCircleOutline } from 'ionicons/icons';

@Injectable({
    providedIn: 'root'
})
export class IonIconsService {

    public useDefinedIcons = () => addIcons({
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
        checkmarkCircleOutline
    });
}
