import './index.css';

import { useCallback, useEffect, useMemo, useState } from "react";

// Chakra imports
import { Box, useDisclosure } from "@chakra-ui/react";
import ColumnsTable from "views/admin/documents/components/ColumnsTable";
import {
  columnsDataColumns
} from "views/admin/documents/variables/columnsData";

import Upload from 'views/admin/documents/components/Upload';


import { AppModule } from 'core/di/app.module';
import { EvidenceDocument } from 'core/domain/models/evidences.model';
import { EvidenceDocumentRepository } from 'core/domain/repositories/evidences.repository';
import { EVIDENCE_DOCS_REPOSITORY } from 'core/domain/repositories/master.repository';
import { LLOG } from 'core/domain/utils/log.utils';
import { useParams } from 'react-router-dom';
import { useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';
import UploadingModal from './components/UploadingModal';
import { useDropzone } from 'react-dropzone';

const docsRepo: EvidenceDocumentRepository = AppModule.getInstance().provideRepository(EVIDENCE_DOCS_REPOSITORY);



function BasicUpload() {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  let formData = new FormData()

  const fileObjects = acceptedFiles.map(file => {
    console.log(file)
    formData.append('assets', file, file.name)
  })

  console.log(formData.getAll('assets'))

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default function Settings() {
  const [documents, setDocuments] = useState<Array<EvidenceDocument>>([]);
  let { id, evidenceName } = useParams<any>();
  const [isUploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0);

  const columns = useMemo<any>(() => columnsDataColumns, [columnsDataColumns]);
  const data = useMemo<any>(() => documents, [documents]);

  const onDrop = useCallback((acceptedFiles: any[]) => {
    // Do something with the files
    LLOG.d('onDrop file ', JSON.stringify(acceptedFiles));
    acceptedFiles.forEach(file => {
      console.log("abc ", file);
    });

    startUpdload(acceptedFiles)

  }, []);
  const dropzoneState = useDropzone({ onDrop })


  const uploadModalState = useDisclosure();
  function onUploadProgress(progress: number) {
    LLOG.d("Upload file progress ", progress)
    setUploadProgress(progress)
  }

  function startUpdload(files: File[]) {
    setUploadProgress(0)
    let formData = new FormData()
    // const fileObjects = dropzoneState.acceptedFiles.map(file => {

    // })
    LLOG.d('on start upload ', JSON.stringify(files));


    uploadModalState.onOpen();
    docsRepo.uploadFile(
      new EvidenceDocument('', id, '', files[0].name, '', '', ''),
      files,
      formData, onUploadProgress, {
      onSuccess(data) {
        uploadModalState.onClose();
        getAllDocuments()
      },
      onFailure(code, message) {
        alert(JSON.stringify(message));
        uploadModalState.onClose()

      },
    }
    )
  }

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance

  useEffect(() => {
    getAllDocuments();
  }, []);


  function getAllDocuments() {
    docsRepo.getDocsByEvidence(id, {
      onFailure(code, message) {
      },
      onSuccess(data) {
        setDocuments(data)
      },
    })
  }

  // Chakra Color Mode
  return (
    <Box pt={{ md: "80px", xl: "80px" }}>
      <Upload
        dropZoneState={dropzoneState}
      />
      {/* <BasicUpload/> */}
      <ColumnsTable
        columnsData={columnsDataColumns}
        tableData={documents}
        onRereshData={getAllDocuments}
        tableInstance={tableInstance}
        caseName={evidenceName}
        evidenceId={id}
      />
      <UploadingModal
      progress={uploadProgress}
        isOpen={uploadModalState.isOpen}
        onOpen={uploadModalState.onOpen}
        onClose={uploadModalState.onClose}
        message={'Đang tải lên vui lòng đợi...'}
      />
    </Box>
  );
}
