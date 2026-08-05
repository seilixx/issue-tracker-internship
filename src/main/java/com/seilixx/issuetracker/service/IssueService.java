package com.seilixx.issuetracker.service;

import com.seilixx.issuetracker.dto.IssueDto;
import com.seilixx.issuetracker.entity.Issue;
import com.seilixx.issuetracker.entity.Status;
import com.seilixx.issuetracker.entity.User;
import com.seilixx.issuetracker.exception.ResourceNotFoundException;
import com.seilixx.issuetracker.repository.IssueRepository;
import com.seilixx.issuetracker.repository.ProjectRepository;
import com.seilixx.issuetracker.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class IssueService {
    private final IssueRepository issueRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public IssueService(IssueRepository issueRepository,  ProjectRepository projectRepository, UserRepository userRepository) {
        this.issueRepository = issueRepository;
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public List<IssueDto> getIssues() {
        List<Issue> issues = issueRepository.findAll();
        List<IssueDto> issueDtos = new ArrayList<>();

        for(Issue issue : issues){
            IssueDto issueDto = new IssueDto();
            issueDto.setId(issue.getId());
            issueDto.setTitle(issue.getTitle());
            issueDto.setDescription(issue.getDescription());
            issueDto.setStatus(issue.getStatus());
            issueDto.setCreatorId(issue.getCreator().getId());
            if (issue.getProject()!= null){issueDto.setProjectId(issue.getProject().getId());}
            List<Long> assigneeIds = new ArrayList<>();
            for (User assignee : issue.getAssignees()) {
                Long id = assignee.getId();
                assigneeIds.add(id);
            }
            issueDto.setAssignedIds(assigneeIds);
            issueDtos.add(issueDto);
        }
        return issueDtos;
    }

    public IssueDto getIssueById(Long id){
        Issue issue=issueRepository.findById(id)
                .orElseThrow(()-> new ResourceNotFoundException("Issue not found"));
        IssueDto issueDto=new IssueDto();
        issueDto.setId(issue.getId());
        issueDto.setTitle(issue.getTitle());
        issueDto.setDescription(issue.getDescription());
        issueDto.setStatus(issue.getStatus());
        return issueDto;
    }

    public IssueDto createIssue(IssueDto issueDto){
        Issue issue=new Issue();
        issue.setTitle(issueDto.getTitle());
        issue.setDescription(issueDto.getDescription());
        issue.setStatus(Status.OPEN);
        Issue savedIssue = issueRepository.save(issue);
        issueDto.setId(savedIssue.getId());
        issueDto.setStatus(savedIssue.getStatus());
        return issueDto;
    }
}
