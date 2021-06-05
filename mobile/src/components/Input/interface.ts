import { NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

export interface IComponentInput{
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onChangeText?: (e: string) => void;
}