//% color="#EEAA00" icon="\uf09c"
//% block="ET: Gate"
//% block.loc.nl="ET: Gate"
namespace EtGate {
    let MODULE = "EtGate"

    let GATE = false
    let SWITCH1 = false
    let SWITCH2 = false

    export enum Gate {
        //% block="free"
        //% block.loc.nl="vrij"
        Open,
        //% block="occupied"
        //% block.loc.nl="bezet"
        Close
    }

    export enum State {
        //% block="opens"
        //% block.loc.nl="opent"
        Opens,
        //% block="closes"
        //% block.loc.nl="sluit"
        Closes
    }

    let EventGateOpens: EtCommon.eventHandler
    let EventGateCloses: EtCommon.eventHandler
    let EventSwitch1Opens: EtCommon.eventHandler
    let EventSwitch1Closes: EtCommon.eventHandler
    let EventSwitch2Opens: EtCommon.eventHandler
    let EventSwitch2Closes: EtCommon.eventHandler

    export function onEventGateOpens(id: string, value: string) {
        GATE = false
basic.showString("f");
        if (EventGateOpens) {
            EventGateOpens(id)
        }
    }

    export function onEventGateCloses(id: string, value: string) {
        GATE = true
basic.showString("t");
        if (EventGateCloses) {
            EventGateCloses(id)
        }
    }

    export function onEventSwitch1Opens(id: string, value: string) {
        SWITCH1 = false
        if (EventSwitch1Opens) {
            EventSwitch1Opens(id)
        }
    }

    export function onEventSwitch1Closes(id: string, value: string) {
        SWITCH1 = true
        if (EventSwitch1Closes) {
            EventSwitch1Closes(id)
        }
    }

    export function onEventSwitch2Opens(id: string, value: string) {
        SWITCH2 = false
        if (EventSwitch2Opens) {
            EventSwitch2Opens(id)
        }
    }

    export function onEventSwitch2Closes(id: string, value: string) {
        SWITCH2 = true
        if (EventSwitch2Closes) {
            EventSwitch2Closes(id)
        }
    }

    //% block="ID"
    //% block.loc.nl="ID"
    export function id(): string {
        return MODULE
    }

    //% block="set module id to %id"
    //% block.loc.nl="stel de module id in op %id"
    //% id.defl="EtGate"
    export function setModuleId(id: string) {
        EtCommon.events.unregister(MODULE)
        MODULE = id
        EtCommon.events.register(id, "gateopens", onEventGateOpens)
        EtCommon.events.register(id, "gatecloses", onEventGateCloses)
        EtCommon.events.register(id, "sw1opens", onEventSwitch1Opens)
        EtCommon.events.register(id, "sw1closes", onEventSwitch1Closes)
        EtCommon.events.register(id, "sw2opens", onEventSwitch2Opens)
        EtCommon.events.register(id, "sw2closes", onEventSwitch2Closes)
    }

    //% block="switch 2 of %id is %state"
    //% block.loc.nl="schakelaar 2 van %id is %state"
    //% id.defl="EtGate"
    export function askSwitch2(id: string, state: State): boolean {
        if (state == State.Opens)
            return !SWITCH2
        return SWITCH2
    }

    //% block="switch 1 of %id is %state"
    //% block.loc.nl="schakelaar 1 van %id is %state"
    //% id.defl="EtGate"
    export function askSwitch1(id: string, state: State): boolean {
        if (state == State.Opens)
            return !SWITCH1
        return SWITCH1
    }

    //% block="the gate of %id is %state"
    //% block.loc.nl="de poort van %id %state is"
    //% id.defl="EtGate"
    export function askGate(id: string, state: Gate): boolean {
        if (state == Gate.Open)
            return !GATE
        return GATE
    }

    //% block="when switch 2 of %id %state"
    //% block.loc.nl="wanneer schakelaar 2 van %id %state"
    //% id.defl="EtGate"
    export function onSwitch2(id: string, state: State, programmableCode: () => void): void {
        if (state == State.Opens) {
            EtCommon.events.register(id, "sw2opens", onEventSwitch2Opens)
            EventSwitch2Opens = programmableCode
        }
        else {
            EtCommon.events.register(id, "sw2closes", onEventSwitch2Closes)
            EventSwitch2Closes = programmableCode
        }
    }

    //% block="when switch 1 of %id %state"
    //% block.loc.nl="wanneer schakelaar 1 van %id %state"
    //% id.defl="EtGate"
    export function onSwitch1(id: string, state: State, programmableCode: () => void): void {
        if (state == State.Opens) {
            EtCommon.events.register(id, "sw1opens", onEventSwitch1Opens)
            EventSwitch1Opens = programmableCode
        }
        else {
            EtCommon.events.register(id, "sw1closes", onEventSwitch1Closes)
            EventSwitch1Closes = programmableCode
        }
    }

    //% block="when the gate of %id is %state"
    //% block.loc.nl="wanneer de poort van %id %state is"
    //% id.defl="EtGate"
    export function onGate(id: string, state: Gate, programmableCode: () => void): void {
        if (state == Gate.Open) {
            EventGateOpens = programmableCode
        }
        else {
            EventGateCloses = programmableCode
        }
    }

    EtCommon.events.register(MODULE, "gateopens", onEventGateOpens)
    EtCommon.events.register(MODULE, "gatecloses", onEventGateCloses)
    EtCommon.events.register(MODULE, "sw1opens", onEventSwitch1Opens)
    EtCommon.events.register(MODULE, "sw1closes", onEventSwitch1Closes)
    EtCommon.events.register(MODULE, "sw2opens", onEventSwitch2Opens)
    EtCommon.events.register(MODULE, "sw2closes", onEventSwitch2Closes)

}
