import os

from ingestors.base import Ingestor
from ingestors.support.encoding import EncodingSupport
from ingestors.support.plain import PlainTextSupport
from ingestors.exc import ProcessingException


class PlainTextIngestor(Ingestor, EncodingSupport, PlainTextSupport):
    """Plan text file ingestor class.

    Extracts the text from the document and enforces unicode on it.
    """
    MIME_TYPES = ['text/plain']
    MAX_SIZE = 4 * 1024 * 1024
    SCORE = 1

    def ingest(self, file_path):
        """Ingestor implementation."""
        file_size = self.result.size or os.path.getsize(file_path)
        if file_size > self.MAX_SIZE:
            raise ProcessingException("Text file is too large.")

        text = self.read_file_decoded(file_path)
        if text is None:
            raise ProcessingException("Document could not be decoded.")

        self.extract_plain_text_content(text)