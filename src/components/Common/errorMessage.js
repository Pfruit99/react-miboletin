//  employee
export const getErrorMessageEmployee = (type, t) => {
    switch (type) {
        case 'unique violation':
            return t("Employee error duplicate");
        default:
            return t( "Employee created error");
    }
}
// FoodType
export const getErrorMessageFoodType = (type, t) => {
    switch (type) {
        case 'unique violation':
            return t("FoodType error duplicate");
        default:
            return t("FoodType created error");
    }
}

// Casino
export const getErrorMessageCasino = (type, t) => {
    switch (type) {
        case 'unique violation':
            return t("Casino error duplicate");
        default:
            return t( "Casino created error");
    }
}

// Menu
export const getErrorMessageMenu = (type, t) => {
    switch (type) {
        case 'unique violation':
            return t("Menu error duplicate");
        default:
            return t( "Menu created error");
    }
}

// Foodcomponent
export const getErrorMessageFoodComponent = (type, t) => {
    switch (type) {
        case 'unique violation':
            return t("FoodComponent error duplicate");
        default:
            return t( "FoodComponent created error");
    }
}

// Request Management
export const getErrorMessageRequestManagement = (type, t) => {
    switch (type) {
        case 'unique violation':
            return "Error de duplicación";
        default:
            return "Hubo un error al procesar esta petición";
    }
}

// Reserve report
export const getErrorMessageReserveReport = (type, t) => {
    switch (type) {
        case 'unique violation':
            return ;
        default:
            return "Hubo un error al procesar esta petición";
    }
}

// User
export const getErrorMessageUser = (type, t) => {
    switch (type) {
        case 'unique violation':
            return "Usuario duplicado";
        default:
            return "Hubo un error al procesar esta petición";
    }
}

// Rector
export const getErrorMessageRector = (type, t) => {
    switch (type) {
        case 'unique violation':
            return "Usuario duplicado";
        default:
            return "Hubo un error al procesar esta petición";
    }
}

// Teacher
export const getErrorMessageDocente = (type, t) => {
    switch (type) {
        case 'unique violation':
            return "Usuario duplicado";
        default:
            return "Hubo un error al procesar esta petición";
    }
}

// Student
export const getErrorMessageEstudiante = (type, t) => {
    switch (type) {
        case 'unique violation':
            return "Usuario duplicado";
        default:
            return "Hubo un error al procesar esta petición";
    }
}

// Institucion
export const getErrorMessageInstitucion = (type, t) => {
    switch (type) {
        case 'unique violation':
            return "Usuario duplicado";
        default:
            return "Hubo un error al procesar esta petición";
    }
}

// contratacion
export const getErrorMessageContratacion = (type, t) => {
    switch (type) {
        case 'unique violation':
            return "Usuario duplicado";
        default:
            return "Hubo un error al procesar esta petición";
    }
}

// curso
export const getErrorMessageCurso = (type, t) => {
    switch (type) {
        case 'unique violation':
            return "Usuario duplicado";
        default:
            return "Hubo un error al procesar esta petición";
    }
}

// asignatura
export const getErrorMessageAsignatura = (type, t) => {
    switch (type) {
        case 'unique violation':
            return "Usuario duplicado";
        default:
            return "Hubo un error al procesar esta petición";
    }
}


