import { action, makeObservable, observable } from "mobx";
import { Character, CreateCharacter, ProgressState } from "../../common/model";
import { ActionProgress, UserState, userStore } from "../user";
import axios, { AxiosError } from "axios";

export class CharactersState {
  characters: Character[] = [];
  charactersFilterProgress: ActionProgress = { state: "IDLE", message: null };
  characterCreationProgress: ActionProgress = { state: "IDLE", message: null };

  userStore: UserState;

  constructor(userStore: UserState) {
    this.userStore = userStore;
    makeObservable(this, {
      characters: observable,
      charactersFilterProgress: observable,
      characterCreationProgress: observable,
      createCharacter: action,
      appendToCharactersList: action,
      updateCharacterCreationProgressState: action,
      updateCharactersFilterProgressState: action,
      updateCharacters: action,
    });
  }

  updateCharacters = (characters: Character[]) => {
    this.characters = characters;
  };

  appendToCharactersList = (character: Character) => {
    this.characters = [...this.characters, character];
  };

  updateCharacterCreationProgressState = (
    state: ProgressState,
    message: string | null,
  ) => {
    this.characterCreationProgress = {
      state,
      message,
    };
  };

  updateCharactersFilterProgressState = (
    state: ProgressState,
    message: string | null,
  ) => {
    this.charactersFilterProgress = {
      state,
      message,
    };
  };

  createCharacter = async (createCharacter: CreateCharacter) => {
    try {
      this.updateCharacterCreationProgressState("IN_PROGRESS", null);
      const response = await axios.post(
        "http://localhost:3001/api/character",
        {
          ...createCharacter,
        },
        {
          headers: {
            Authorization: `Bearer ${this.userStore.user?.accessToken}`,
          },
        },
      );
      const character: Character = response.data;
      this.updateCharacterCreationProgressState(
        "SUCCESS",
        "Character created successfully",
      );
      this.appendToCharactersList(character);
    } catch (err: any) {
      const aerr: AxiosError = err as AxiosError;
      if (aerr.response?.status === 401) {
        this.userStore.resetUser();
      }
      console.log(err);
      this.updateCharacterCreationProgressState(
        "FAILED",
        err.response?.data?.message || "Failed to create character",
      );
    }
  };

  filterCharacters = async () => {
    try {
      this.updateCharactersFilterProgressState("IN_PROGRESS", null);
      const response = await axios.get("http://localhost:3001/api/character", {
        headers: {
          Authorization: `Bearer ${this.userStore.user?.accessToken}`,
        },
      });
      const data: { characters: Character[] } = response.data;
      this.updateCharacters(data.characters);
      this.updateCharactersFilterProgressState(
        "SUCCESS",
        "Character created successfully",
      );
    } catch (err: any) {
      const aerr: AxiosError = err as AxiosError;
      if (aerr.response?.status === 401) {
        this.userStore.resetUser();
      }
      console.log(err);
      this.updateCharactersFilterProgressState(
        "FAILED",
        err.response?.data?.message || "Failed to list characters",
      );
    }
  };
}

export const charactersStore = new CharactersState(userStore);
