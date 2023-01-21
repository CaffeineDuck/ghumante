import typing as ty
from firebase_admin.auth import verify_id_token  # type: ignore
from pathlib import Path
from firebase_admin import App, initialize_app, credentials

import logging


class FirebaseClient:
    def __init__(self, config_file="private_key.json", logger=logging.Logger(__name__)):

        config_full_path = Path(__file__).parent / config_file
        self.creds = credentials.Certificate(config_full_path)

        self._logger = logger

        self._app = initialize_app(self.creds)

    def verify_id_token(self, token: str) -> ty.Optional[dict]:
        try:
            return verify_id_token(id_token=token, app=self._app)

        except Exception as e:
            self._logger.error(f"Error verifying token: {e}")
            return
